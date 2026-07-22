from database.db import log_event

def flag_user(state):

    user_id = state.get("user_id", "user_1")

    log_event(user_id, "FLAG", state)

    return "FLAGGED"