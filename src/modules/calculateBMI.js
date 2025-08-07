import { cachedWeights, currentUserData } from "./dashboard";

export function getBMI() {
    const userHeightCm = currentUserData.height;
    if (!userHeightCm) {
        console.error("Height is missing from user profile!");
        return cachedWeights.map(current => ({ ...current, BMI: "N/A", category: "Unknown" }));
    }

    const userHeightM = userHeightCm / 100;

    return cachedWeights.map(current => {
        const weight = parseFloat(current.weight);
        if (isNaN(weight)) return { ...current, BMI: "N/A", category: "Unknown" };

        const BMI = weight / (userHeightM ** 2);
        const roundedBMI = BMI.toFixed(1);

        let category = "";
        if (BMI < 18.5) category = "Underweight";
        else if (BMI < 25) category = "Normal weight";
        else if (BMI < 30) category = "Overweight";
        else category = "Obese";

        return { ...current, BMI: roundedBMI, category };
    });
}
