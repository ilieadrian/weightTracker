console.log("Hellow from profile")

import { generateLayout } from "./layout.js";

function generateProfileUI() {
  const content = `
    <h2 class="text-lg font-semibold mb-2">User Profile</h2>
    <p>Here you can update your account info, settings, etc.</p>
  `;
  return generateLayout(content, "Profile");
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = generateProfileUI();
});