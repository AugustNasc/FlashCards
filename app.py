import csv
import io
import json
import os
import sqlite3
from datetime import datetime, timezone

import requests
from flask import Flask, jsonify, request, send_file, send_from_directory

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "flashcards.db")

app = Flask(__name__)


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS cards (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                collection_id INTEGER,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        cols = [row["name"] for row in conn.execute("PRAGMA table_info(cards)").fetchall()]
        if "collection_id" not in cols:
            conn.execute("ALTER TABLE cards ADD COLUMN collection_id INTEGER")
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS collections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS study_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT NOT NULL,
                duration_sec INTEGER NOT NULL,
                total INTEGER NOT NULL,
                correct INTEGER NOT NULL,
                incorrect INTEGER NOT NULL,
                easy INTEGER NOT NULL,
                hard INTEGER NOT NULL,
                details_json TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS card_difficulty (
                card_id INTEGER PRIMARY KEY,
                difficulty TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS study_goals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                collection_id INTEGER NOT NULL UNIQUE,
                days_json TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )


def row_to_dict(row):
    return {
        "id": row["id"],
        "collection_id": row["collection_id"],
        "question": row["question"],
        "answer": row["answer"],
        "created_at": row["created_at"],
    }


def extract_output_text(response_json):
    # Best-effort extraction for Responses API output text
    output_texts = []
    for item in response_json.get("output", []):
        for content in item.get("content", []):
            if content.get("type") in ("output_text", "text"):
                output_texts.append(content.get("text", ""))
    return "\n".join(output_texts).strip()


@app.route("/")
def index():
    return send_from_directory("templates", "index.html")


@app.route("/study")
def study():
    return send_from_directory("templates", "study.html")


@app.route("/api/cards", methods=["GET"])
def list_cards():
    collection_id = request.args.get("collection_id", "").strip()
    with get_db() as conn:
        if collection_id.isdigit():
            rows = conn.execute(
                """
                SELECT id, collection_id, question, answer, created_at
                FROM cards
                WHERE collection_id = ?
                ORDER BY id DESC
                """,
                (int(collection_id),),
            ).fetchall()
        else:
            rows = conn.execute(
                "SELECT id, collection_id, question, answer, created_at FROM cards ORDER BY id DESC"
            ).fetchall()
    return jsonify([row_to_dict(row) for row in rows])


@app.route("/api/study/cards", methods=["GET"])
def study_cards():
    limit = request.args.get("limit", "").strip()
    collection_id = request.args.get("collection_id", "").strip()
    difficulty = request.args.get("difficulty", "").strip().lower()
    if not collection_id.isdigit():
        return jsonify({"error": "collection_id é obrigatório."}), 400
    with get_db() as conn:
        where_clause = ""
        params = []
        where_clause = "WHERE collection_id = ?"
        params.append(int(collection_id))
        if difficulty in ("easy", "hard"):
            where_clause += " AND id IN (SELECT card_id FROM card_difficulty WHERE difficulty = ?)"
            params.append(difficulty)
        if limit.isdigit():
            rows = conn.execute(
                f"""
                SELECT id, collection_id, question, answer, created_at
                FROM cards
                {where_clause}
                ORDER BY RANDOM() LIMIT ?
                """,
                (*params, int(limit)),
            ).fetchall()
        else:
            rows = conn.execute(
                f"""
                SELECT id, collection_id, question, answer, created_at
                FROM cards
                {where_clause}
                ORDER BY RANDOM()
                """,
                params,
            ).fetchall()
    return jsonify([row_to_dict(row) for row in rows])


@app.route("/api/study/sessions", methods=["GET"])
def list_study_sessions():
    with get_db() as conn:
        rows = conn.execute(
            """
            SELECT id, created_at, duration_sec, total, correct, incorrect, easy, hard, details_json
            FROM study_sessions
            ORDER BY id DESC
            LIMIT 20
            """
        ).fetchall()
    sessions = []
    for row in rows:
        sessions.append(
            {
                "id": row["id"],
                "created_at": row["created_at"],
                "duration_sec": row["duration_sec"],
                "total": row["total"],
                "correct": row["correct"],
                "incorrect": row["incorrect"],
                "easy": row["easy"],
                "hard": row["hard"],
                "details": json.loads(row["details_json"]),
            }
        )
    return jsonify(sessions)


@app.route("/api/study/collections", methods=["GET"])
def study_collections():
    with get_db() as conn:
        rows = conn.execute(
            """
            SELECT c.id, c.name,
                   COUNT(cards.id) AS card_count,
                   (
                     SELECT COUNT(*)
                     FROM card_difficulty cd
                     JOIN cards c2 ON c2.id = cd.card_id
                     WHERE c2.collection_id = c.id
                   ) AS difficulty_count
                   ,
                   (
                     SELECT COUNT(*)
                     FROM card_difficulty cd
                     JOIN cards c2 ON c2.id = cd.card_id
                     WHERE c2.collection_id = c.id AND cd.difficulty = 'easy'
                   ) AS easy_count,
                   (
                     SELECT COUNT(*)
                     FROM card_difficulty cd
                     JOIN cards c2 ON c2.id = cd.card_id
                     WHERE c2.collection_id = c.id AND cd.difficulty = 'hard'
                   ) AS hard_count
            FROM collections c
            LEFT JOIN cards ON cards.collection_id = c.id
            GROUP BY c.id
            ORDER BY c.name ASC
            """
        ).fetchall()
    payload = []
    for row in rows:
        card_count = int(row["card_count"] or 0)
        difficulty_count = int(row["difficulty_count"] or 0)
        easy_count = int(row["easy_count"] or 0)
        hard_count = int(row["hard_count"] or 0)
        ready = card_count > 0 and difficulty_count == card_count
        payload.append(
            {
                "id": row["id"],
                "name": row["name"],
                "card_count": card_count,
                "difficulty_count": difficulty_count,
                "easy_count": easy_count,
                "hard_count": hard_count,
                "difficulty_ready": ready,
            }
        )
    return jsonify(payload)


@app.route("/api/study/sessions", methods=["POST"])
def create_study_session():
    data = request.get_json(force=True)
    duration_sec = int(data.get("duration_sec") or 0)
    total = int(data.get("total") or 0)
    correct = int(data.get("correct") or 0)
    incorrect = int(data.get("incorrect") or 0)
    easy = int(data.get("easy") or 0)
    hard = int(data.get("hard") or 0)
    details = data.get("details") or {}
    collection_id = data.get("collection_id")
    created_at = datetime.now(timezone.utc).isoformat()

    with get_db() as conn:
        cur = conn.execute(
            """
            INSERT INTO study_sessions
            (created_at, duration_sec, total, correct, incorrect, easy, hard, details_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                created_at,
                duration_sec,
                total,
                correct,
                incorrect,
                easy,
                hard,
                json.dumps(details),
            ),
        )
        session_id = cur.lastrowid
        easy_cards = details.get("easy_cards") or []
        hard_cards = details.get("hard_cards") or []
        updated_at = created_at
        card_updates = {}
        for card_id in easy_cards:
            if str(card_id).isdigit():
                card_updates[int(card_id)] = "easy"
        for card_id in hard_cards:
            if str(card_id).isdigit():
                card_updates[int(card_id)] = "hard"
        if card_updates:
            conn.executemany(
                """
                INSERT INTO card_difficulty (card_id, difficulty, updated_at)
                VALUES (?, ?, ?)
                ON CONFLICT(card_id) DO UPDATE SET difficulty = excluded.difficulty, updated_at = excluded.updated_at
                """,
                [(card_id, difficulty, updated_at) for card_id, difficulty in card_updates.items()],
            )

    return jsonify(
        {
            "id": session_id,
            "created_at": created_at,
            "duration_sec": duration_sec,
            "total": total,
            "correct": correct,
            "incorrect": incorrect,
            "easy": easy,
            "hard": hard,
        }
    )


@app.route("/api/study/sessions/<int:session_id>", methods=["DELETE"])
def delete_study_session(session_id):
    with get_db() as conn:
        conn.execute("DELETE FROM study_sessions WHERE id = ?", (session_id,))
    return jsonify({"ok": True})


@app.route("/api/cards", methods=["POST"])
def create_card():
    data = request.get_json(force=True)
    question = (data.get("question") or "").strip()
    answer = (data.get("answer") or "").strip()
    collection_id = data.get("collection_id")
    if collection_id is None or not str(collection_id).isdigit():
        return jsonify({"error": "Selecione uma coleção antes de criar cards."}), 400
    if not question or not answer:
        return jsonify({"error": "Pergunta e resposta são obrigatórias."}), 400

    created_at = datetime.now(timezone.utc).isoformat()
    with get_db() as conn:
        cur = conn.execute(
            """
            INSERT INTO cards (collection_id, question, answer, created_at)
            VALUES (?, ?, ?, ?)
            """,
            (int(collection_id), question, answer, created_at),
        )
        card_id = cur.lastrowid
    return jsonify(
        {
            "id": card_id,
            "collection_id": int(collection_id),
            "question": question,
            "answer": answer,
            "created_at": created_at,
        }
    )


@app.route("/api/cards/<int:card_id>", methods=["DELETE"])
def delete_card(card_id):
    with get_db() as conn:
        conn.execute("DELETE FROM cards WHERE id = ?", (card_id,))
    return jsonify({"ok": True})


@app.route("/api/generate", methods=["POST"])
def generate_cards():
    api_key = request.headers.get("X-OpenAI-Key", "").strip() or os.environ.get(
        "OPENAI_API_KEY", ""
    ).strip()
    if not api_key:
        return (
            jsonify(
                {
                    "error": "Defina a API Key nas configurações ou em OPENAI_API_KEY.",
                }
            ),
            400,
        )

    data = request.get_json(force=True)
    topic = (data.get("topic") or "").strip()
    count = int(data.get("count") or 5)
    count = max(1, min(count, 60))
    collection_id = data.get("collection_id")
    if collection_id is None or not str(collection_id).isdigit():
        return jsonify({"error": "Selecione uma coleção antes de gerar cards."}), 400

    prompt = (
        "Gere flashcards no formato JSON. "
        "Responda SOMENTE com um JSON contendo a chave 'cards' e uma lista de objetos "
        "com 'question' e 'answer'. "
        f"Tema: {topic or 'geral'}. Quantidade: {count}."
    )

    response = requests.post(
        "https://api.openai.com/v1/responses",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": "gpt-4.1",
            "input": prompt,
            "text": {
                "format": {"type": "json_object"},
            },
        },
        timeout=60,
    )

    if response.status_code >= 400:
        return jsonify({"error": "Falha ao gerar cards", "details": response.text}), 502

    response_json = response.json()
    output_text = extract_output_text(response_json)

    try:
        payload = json.loads(output_text)
        cards = payload.get("cards", [])
    except json.JSONDecodeError:
        return jsonify({"error": "Resposta da IA não veio em JSON válido.", "raw": output_text}), 502

    saved = []
    created_at = datetime.now(timezone.utc).isoformat()
    with get_db() as conn:
        for card in cards:
            question = str(card.get("question", "")).strip()
            answer = str(card.get("answer", "")).strip()
            if not question or not answer:
                continue
            cur = conn.execute(
                """
                INSERT INTO cards (collection_id, question, answer, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (
                    int(collection_id),
                    question,
                    answer,
                    created_at,
                ),
            )
            saved.append(
                {
                    "id": cur.lastrowid,
                    "collection_id": int(collection_id),
                    "question": question,
                    "answer": answer,
                    "created_at": created_at,
                }
            )

    usage = response_json.get("usage", {})
    return jsonify({"created": saved, "usage": usage})


@app.route("/api/export/csv", methods=["GET"])
def export_csv():
    collection_id = request.args.get("collection_id", "").strip()
    with get_db() as conn:
        if collection_id.isdigit():
            rows = conn.execute(
                """
                SELECT id, collection_id, question, answer, created_at
                FROM cards
                WHERE collection_id = ?
                ORDER BY id DESC
                """,
                (int(collection_id),),
            ).fetchall()
        else:
            rows = conn.execute(
                "SELECT id, collection_id, question, answer, created_at FROM cards ORDER BY id DESC"
            ).fetchall()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["id", "collection_id", "question", "answer", "created_at"])
    for row in rows:
        writer.writerow(
            [row["id"], row["collection_id"], row["question"], row["answer"], row["created_at"]]
        )

    mem = io.BytesIO(output.getvalue().encode("utf-8"))
    return send_file(
        mem,
        mimetype="text/csv",
        as_attachment=True,
        download_name="flashcards.csv",
    )


@app.route("/api/export/xlsx", methods=["GET"])
def export_xlsx():
    try:
        from openpyxl import Workbook
    except ImportError:
        return (
            jsonify(
                {
                    "error": "Instale openpyxl para exportar XLSX: pip install openpyxl",
                }
            ),
            400,
        )
    collection_id = request.args.get("collection_id", "").strip()
    with get_db() as conn:
        if collection_id.isdigit():
            rows = conn.execute(
                """
                SELECT id, collection_id, question, answer, created_at
                FROM cards
                WHERE collection_id = ?
                ORDER BY id DESC
                """,
                (int(collection_id),),
            ).fetchall()
        else:
            rows = conn.execute(
                "SELECT id, collection_id, question, answer, created_at FROM cards ORDER BY id DESC"
            ).fetchall()

    wb = Workbook()
    ws = wb.active
    ws.title = "Flashcards"
    ws.append(["id", "collection_id", "question", "answer", "created_at"])
    for row in rows:
        ws.append([row["id"], row["collection_id"], row["question"], row["answer"], row["created_at"]])

    mem = io.BytesIO()
    wb.save(mem)
    mem.seek(0)
    return send_file(
        mem,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        as_attachment=True,
        download_name="flashcards.xlsx",
    )


@app.route("/api/collections", methods=["GET"])
def list_collections():
    with get_db() as conn:
        rows = conn.execute(
            "SELECT id, name, created_at FROM collections ORDER BY name ASC"
        ).fetchall()
    return jsonify([{"id": row["id"], "name": row["name"], "created_at": row["created_at"]} for row in rows])


@app.route("/api/collections", methods=["POST"])
def create_collection():
    data = request.get_json(force=True)
    name = (data.get("name") or "").strip()
    if not name:
        return jsonify({"error": "Nome da coleção é obrigatório."}), 400
    created_at = datetime.now(timezone.utc).isoformat()
    with get_db() as conn:
        try:
            cur = conn.execute(
                "INSERT INTO collections (name, created_at) VALUES (?, ?)",
                (name, created_at),
            )
        except sqlite3.IntegrityError:
            return jsonify({"error": "Já existe uma coleção com esse nome."}), 400
    return jsonify({"id": cur.lastrowid, "name": name, "created_at": created_at})


@app.route("/api/collections/<int:collection_id>", methods=["DELETE"])
def delete_collection(collection_id):
    with get_db() as conn:
        conn.execute("DELETE FROM cards WHERE collection_id = ?", (collection_id,))
        conn.execute("DELETE FROM study_goals WHERE collection_id = ?", (collection_id,))
        conn.execute("DELETE FROM collections WHERE id = ?", (collection_id,))
    return jsonify({"ok": True})


def _collection_exists(conn, collection_id):
    row = conn.execute(
        "SELECT id FROM collections WHERE id = ?",
        (collection_id,),
    ).fetchone()
    return row is not None


@app.route("/api/goals/<int:collection_id>", methods=["GET"])
def get_goals(collection_id):
    with get_db() as conn:
        if not _collection_exists(conn, collection_id):
            return jsonify({"error": "Coleção não encontrada."}), 404
        row = conn.execute(
            """
            SELECT collection_id, days_json, created_at, updated_at
            FROM study_goals
            WHERE collection_id = ?
            """,
            (collection_id,),
        ).fetchone()
    if not row:
        return jsonify({"collection_id": collection_id, "days": []})
    return jsonify(
        {
            "collection_id": row["collection_id"],
            "days": json.loads(row["days_json"]),
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
        }
    )


@app.route("/api/goals/<int:collection_id>", methods=["PUT"])
def save_goals(collection_id):
    data = request.get_json(force=True)
    days = data.get("days") or []
    if not isinstance(days, list):
        return jsonify({"error": "Formato inválido para dias."}), 400
    try:
        days = sorted({int(day) for day in days})
    except (TypeError, ValueError):
        return jsonify({"error": "Dias inválidos."}), 400
    if any(day < 0 or day > 6 for day in days):
        return jsonify({"error": "Dias devem estar entre 0 e 6."}), 400
    now = datetime.now(timezone.utc).isoformat()
    with get_db() as conn:
        if not _collection_exists(conn, collection_id):
            return jsonify({"error": "Coleção não encontrada."}), 404
        existing = conn.execute(
            "SELECT id FROM study_goals WHERE collection_id = ?",
            (collection_id,),
        ).fetchone()
        if existing:
            conn.execute(
                """
                UPDATE study_goals
                SET days_json = ?, updated_at = ?
                WHERE collection_id = ?
                """,
                (json.dumps(days), now, collection_id),
            )
        else:
            conn.execute(
                """
                INSERT INTO study_goals (collection_id, days_json, created_at, updated_at)
                VALUES (?, ?, ?, ?)
                """,
                (collection_id, json.dumps(days), now, now),
            )
    return jsonify({"collection_id": collection_id, "days": days, "updated_at": now})


@app.route("/api/goals/<int:collection_id>", methods=["DELETE"])
def delete_goals(collection_id):
    with get_db() as conn:
        if not _collection_exists(conn, collection_id):
            return jsonify({"error": "Coleção não encontrada."}), 404
        conn.execute("DELETE FROM study_goals WHERE collection_id = ?", (collection_id,))
    return jsonify({"ok": True})


@app.route("/api/collections/<int:collection_id>/migrate", methods=["POST"])
def migrate_cards(collection_id):
    data = request.get_json(force=True)
    target_id = data.get("target_collection_id")
    if target_id is None or not str(target_id).isdigit():
        return jsonify({"error": "target_collection_id inválido."}), 400
    target_id = int(target_id)
    if target_id == collection_id:
        return jsonify({"error": "A coleção de destino deve ser diferente."}), 400
    with get_db() as conn:
        if not _collection_exists(conn, collection_id):
            return jsonify({"error": "Coleção de origem não encontrada."}), 404
        if not _collection_exists(conn, target_id):
            return jsonify({"error": "Coleção de destino não encontrada."}), 404
        cur = conn.execute(
            "UPDATE cards SET collection_id = ? WHERE collection_id = ?",
            (target_id, collection_id),
        )
    return jsonify({"ok": True, "moved": cur.rowcount})


@app.route("/api/import", methods=["POST"])
def import_cards():
    data = request.get_json(force=True)
    cards = data.get("cards") or []
    collection_id = data.get("collection_id")
    if collection_id is None or not str(collection_id).isdigit():
        return jsonify({"error": "Selecione uma coleção antes de importar cards."}), 400

    created_at = datetime.now(timezone.utc).isoformat()
    saved = []
    with get_db() as conn:
        for card in cards:
            question = str(card.get("question") or "").strip()
            answer = str(card.get("answer") or "").strip()
            if not question or not answer:
                continue
            cur = conn.execute(
                """
                INSERT INTO cards (collection_id, question, answer, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (
                    int(collection_id),
                    question,
                    answer,
                    created_at,
                ),
            )
            saved.append(
                {
                    "id": cur.lastrowid,
                    "collection_id": int(collection_id),
                    "question": question,
                    "answer": answer,
                    "created_at": created_at,
                }
            )
    return jsonify({"created": saved, "count": len(saved)})


init_db()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
