interface Group {
  chars: Set<string>;
  indices: number[];
}

function setConsolidation(sets: string[]): string[][] {
  if (!Array.isArray(sets) || sets.length === 0) return [];

  let groups: Group[] = sets.map((str, idx) => ({
    chars: new Set(str.split('')),
    indices: [idx]
  }));

  let merged = true;
  while (merged) {
    merged = false;
    outer:
    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        const a = groups[i].chars;
        const b = groups[j].chars;
        let intersects = false;
        for (const ch of a) {
          if (b.has(ch)) { intersects = true; break; }
        }
        if (intersects) {
          const union = new Set([...a, ...b]);
          const allIndices = groups[i].indices.concat(groups[j].indices);
          groups.splice(j, 1);
          groups[i] = { chars: union, indices: allIndices };
          merged = true;
          break outer;
        }
      }
    }
  }

  return groups
    .sort((x, y) => Math.max(...y.indices) - Math.max(...x.indices))
    .map(g => Array.from(g.chars).sort());
}
