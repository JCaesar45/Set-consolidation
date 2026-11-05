from fastapi.testclient import TestClient
from main import app, consolidate

client = TestClient(app)

def test_disjoint_ordering():
    assert consolidate(["AB", "CD"]) == [["C", "D"], ["A", "B"]]

def test_single_merge():
    assert consolidate(["AB", "BD"]) == [["A", "B", "D"]]

def test_chain_merge():
    assert consolidate(["AB", "CD", "DB"]) == [["A", "B", "C", "D"]]

def test_five_sets_ordering():
    assert consolidate(["HIK", "AB", "CD", "DB", "FGH"]) == [
        ["F", "G", "H", "I", "K"], ["A", "B", "C", "D"]
    ]

def test_endpoint():
    r = client.post("/consolidate", json={"sets": ["AB", "CD"]})
    assert r.status_code == 200
    assert r.json() == [["C", "D"], ["A", "B"]]
