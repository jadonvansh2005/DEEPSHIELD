from database.db import log_event

def send_alert(state):

    user_id = state.get("user_id", "user_1")

    log_event(user_id, "ALERT", state)

    return "ALERT"