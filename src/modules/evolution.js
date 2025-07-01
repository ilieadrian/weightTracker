import { cachedWeights } from "./dashboard";


export function getEvolution() {
  return cachedWeights.map((current, i) => {
    const prev = cachedWeights[i + 1];

    return {
      ...current,
      evolution:
        prev !== undefined
          ? parseFloat(current.weight) - parseFloat(prev.weight)
          : null,
    };
  });
}

  // console.table(evolution);
  // return evolution;


