from agent.graph import app

def run_agent(file_path, file_type):

    state = {
        "input_data": file_path,
        "input_type": file_type
    }

    result = app.invoke(state)

    return result