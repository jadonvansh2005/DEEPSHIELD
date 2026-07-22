import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

users_col = db["users"]
logs_col = db["logs"]


# -------------------------
# USER STATUS
# -------------------------
def update_user_status(user_id, status):
    users_col.update_one(
        {"user_id": user_id},
        {"$set": {"status": status}},
        upsert=True
    )


def get_user_status(user_id):
    user = users_col.find_one({"user_id": user_id})
    return user["status"] if user else "ACTIVE"


# -------------------------
# LOG EVENTS
# -------------------------
def log_event(user_id, action, data=None):
    logs_col.insert_one({
        "user_id": user_id,
        "action": action,
        "data": data
    })