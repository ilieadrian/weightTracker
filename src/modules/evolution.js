import { cachedWeights } from "./dashboard";


export function getEvolution() {
  return cachedWeights.map((current, i) => {
    const prev = cachedWeights[i + 1];

    return {
      ...current,
      evolution:
        prev !== undefined
          ? setSimbols(current.weight, prev.weight)
          : null,
    };
  });
}

function setSimbols(a, b){
  return parseFloat(a) - parseFloat(b);
}

  // console.table(evolution);
  // return evolution;


