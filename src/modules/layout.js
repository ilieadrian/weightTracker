export function generateHeader(title = "Weight Tracker") {
  return `
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-xl font-bold">${title}</h1>
    </header>
  `;
}

export function generateNavigation() {
  return `
    <nav class="bg-gray-100 p-2 flex justify-around">
      <a href="dashboard.html" class="text-blue-600">Dashboard</a>
      <a href="profile.html" class="text-blue-600">Profile</a>
      <a href="index.html" class="text-blue-600">Logout</a>
    </nav>
  `;
}

export function generateLayout(content, pageTitle = "Weight Tracker") {
  return `
    ${generateHeader(pageTitle)}
    ${generateNavigation()}
    <main class="p-4">
      ${content}
    </main>
  `;
}