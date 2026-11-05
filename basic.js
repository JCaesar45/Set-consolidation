function setConsolidation(sets) {
  // Each group: { chars: Set, indices: Set of original indices }
  let groups = sets.map((s, i) => ({
    chars: new Set(s.split('')),
    indices: new Set([i])
  }));
  
  let changed = true;
  while (changed) {
    changed = false;
    outer:
    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        const shared = [...groups[i].chars].some(c => groups[j].chars.has(c));
        if (shared) {
          groups[i].chars = new Set([...groups[i].chars, ...groups[j].chars]);
          groups[j].indices.forEach(idx => groups[i].indices.add(idx));
          groups.splice(j, 1);
          changed = true;
          break outer;
        }
      }
    }
  }
  
  // Sort by max original index descending, then map to sorted char arrays
  return groups
    .sort((a, b) => Math.max(...b.indices) - Math.max(...a.indices))
    .map(g => [...g.chars].sort());
}
