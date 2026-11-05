from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ConsolidateRequest(BaseModel):
    sets: List[str]

def consolidate(sets: List[str]) -> List[List[str]]:
    if not sets:
        return []
    groups = [{"chars": set(s), "indices": [i]} for i, s in enumerate(sets)]
    merged = True
    while merged:
        merged = False
        for i in range(len(groups)):
            for j in range(i + 1, len(groups)):
                if groups[i]["chars"] & groups[j]["chars"]:
                    groups[i]["chars"] |= groups[j]["chars"]
                    groups[i]["indices"].extend(groups[j]["indices"])
                    del groups[j]
                    merged = True
                    break
            if merged:
                break
    groups.sort(key=lambda g: max(g["indices"]), reverse=True)
    return [sorted(g["chars"]) for g in groups]

@app.post("/consolidate")
def consolidate_endpoint(req: ConsolidateRequest):
    return consolidate(req.sets)
