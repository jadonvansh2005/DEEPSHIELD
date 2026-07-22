from database.db import log_event

def allow_user(state):

    user_id = state.get("user_id", "user_1")

    log_event(user_id, "ALLOW", state)

    return "ALLOWED"