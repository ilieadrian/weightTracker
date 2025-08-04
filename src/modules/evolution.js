import { cachedWeights } from "./dashboard";
import ArrowUp from "../images/arrow-up-solid.svg"
import ArrowDown from "../images/arrow-down-solid.svg"
import Equals from "../images/equals-solid.svg"

console.log("Evolution.js called")

const arrowUp = document.createElement("img");
arrowUp.src = ArrowUp;
arrowUp.alt = "Upward Arrow";

const arrowDown = document.createElement("img");
arrowDown.src = ArrowDown;
arrowDown.alt = "Downward Arrow";

const equalsSign = document.createElement("img");
equalsSign.src = Equals;
equalsSign.alt = "Equals sign";

export function getEvolution() {
  return cachedWeights.map((current, i) => {
  const prev = cachedWeights[i + 1];

  return {
    ...current,
    evolution:
      prev !== undefined
        ? setSymbols(current.weight, prev.weight)
        : equalsSign.src,
    };
  });
}

function setSymbols(a, b){
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  const result = numA - numB;

  if (result >= 1) return arrowUp.src;
  if (result < 0) return arrowDown.src;
  return equalsSign.src;
}



