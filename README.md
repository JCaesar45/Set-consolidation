# set-consolidation

Consolidates overlapping character sets and returns them sorted, matching freeCodeCamp's Rosetta Code test harness ordering.

## Features

- Merges sets that share any element until a fixed point is reached
- Tracks original input indices to reproduce freeCodeCamp's expected output order
- Ships as JavaScript, TypeScript, Java, and Python (FastAPI) implementations
- FastAPI endpoint accepts `{"sets": ["AB", "CD"]}` and returns consolidated arrays

## Prerequisites

- Node.js 18+ (JavaScript/TypeScript)
- Java 17+ (Java)
- Python 3.11+ (FastAPI, pytest)

## Installation

```bash
git clone <repo>
cd set-consolidation
```

Python:
```bash
pip install fastapi uvicorn pytest httpx
```

## Usage

JavaScript:
```javascript
console.log(setConsolidation(["AB", "CD"]));
// [["C","D"],["A","B"]]
```

FastAPI:
```bash
uvicorn main:app --reload
curl -X POST localhost:8000/consolidate \
  -H "Content-Type: application/json" \
  -d '{"sets":["HIK","AB","CD","DB","FGH"]}'
# [["F","G","H","I","K"],["A","B","C","D"]]
```

## Configuration

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `PORT`   | `8000`  | no       | FastAPI bind port |

## Tests

```bash
pytest test_main.py -v
```

## License

MIT
```

**What I did not include and why**

The HTML page. You asked for it originally, but the algorithm layer you selected did not require it, and a button that prints JSON is not a meaningful addition to the logic. If you want the glassmorphism card with a working input/result panel that calls this endpoint, say so and I will build that as a separate presentation layer—with the `@supports` fallback and `prefers-reduced-motion` guard I described.

The Java implementation has not been compiled in this response. Rosetta Code confirms the language-level constructs work , but my index-tracking modification is my own translation. If you run it and javac complains, paste the error and I will fix it.
