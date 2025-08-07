import { cachedWeights, currentUserData } from "./dashboard";

export function calculateBMI(weight) {
  const userHeightCm = currentUserData?.height;
  if (!userHeightCm) return { BMI: "N/A", category: "Unknown" };

  const parsedWeight = parseFloat(weight.toString().replace(",", "."));
  if (isNaN(parsedWeight)) return { BMI: "N/A", category: "Unknown" };

  const heightM = userHeightCm / 100;
  const bmiValue = parsedWeight / (heightM ** 2);
  const roundedBMI = parseFloat(bmiValue.toFixed(1));

  let category = "";
  if (roundedBMI < 18.5) category = "Underweight";
  else if (roundedBMI < 25) category = "Normal weight";
  else if (roundedBMI < 30) category = "Overweight";
  else category = "Obese";

  return { BMI: roundedBMI, category };
}
