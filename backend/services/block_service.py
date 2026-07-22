from database.db import update_user_status, log_event

def block_user(state):

    user_id = state.get("user_id", "user_1")

    update_user_status(user_id, "BLOCKED")
    log_event(user_id, "BLOCK", state)

    print(f"🚨 USER {user_id} BLOCKED")

    return "BLOCKED"