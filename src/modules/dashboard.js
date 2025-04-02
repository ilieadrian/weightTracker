import "../styles.css";

console.log("Hello from dashboard")

function generateDashboardUi(){
    let container = document.querySelector('.dashboard-container');
    const htmlTag = document.getElementsByTagName("html")[0];;
    const bodyTag = document.body;

    if (!container) {
       htmlTag.classList.add("h-full")
       bodyTag.classList.add("h-full", "flex", "items-center", "justify-center", "bg-gray-100");
    
    container = document.createElement("div");
      container.classList.add("container", "w-full", "max-w-md", "bg-white", "shadow-md", "rounded-lg", "p-6", "m-2");
      container.id = 'authContainer'
      document.body.appendChild(container);
    }
  
    const html = `
          <div id="signIn" class="flex flex-col space-y-6"><h4>This is the dasboard</h4></div>
    
   
          
        
            `;


  container.innerHTML = html;
  console.log("Dashboard Ui generated")
}

generateDashboardUi()