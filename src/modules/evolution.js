import { cachedWeights } from "./dashboard";


export function getEvolution(id) {
    console.log("doc.id getEvolution called", id)

  // const evolution = [];



  for (let i = 0; i < cachedWeights.length; i++) {
    const current = cachedWeights[i];
    const prev = cachedWeights[i - 1]; // previous entry in the list (already sorted newest → oldest)

    const diff =
      prev !== undefined
        ? parseFloat(current.weight) - parseFloat(prev.weight)
        : null;
    // evolution.push({
    //   index: current.id,
    //   date: current.date,
    //   weight: current.weight,
    //   change: diff,
    // });

    return 2;
  }

  // console.table(evolution);
  // return evolution;
}

