from verification_engine import verify

def verification_node(state):
    return {"verification": verify(state)}