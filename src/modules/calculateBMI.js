import { cachedWeights, currentUserData } from "./dashboard";

export function getBMI() {
    const userHeightCm = currentUserData.height;
    if (!userHeightCm) {
        console.error("Height is missing from user profile!");
        return cachedWeights.map(current => ({ ...current, BMI: "N/A" }));
    }

    const userHeightM = userHeightCm / 100;

    return cachedWeights.map(current => {
        const weight = parseFloat(current.weight);
        if (isNaN(weight)) return { ...current, BMI: "N/A" };

        const BMI = (weight / (userHeightM ** 2)).toFixed(1);
        return { ...current, BMI };
    });
}
