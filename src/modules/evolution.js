import { cachedWeights } from "./dashboard";


export function getEvolution() {
  return cachedWeights.map((current, i) => {
    const prev = cachedWeights[i + 1];

    return {
      ...current,
      evolution:
        prev !== undefined
          ? setSimbols(current.weight, prev.weight)
          : "=",
    };
  });
}

function setSimbols(a, b){
  console.log("A:", a, "B:", b); // debug

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  const result = numA - numB;

  if (result >= 1) return "^";
  if (result < 0) return "down";
  return "=";
  
}



