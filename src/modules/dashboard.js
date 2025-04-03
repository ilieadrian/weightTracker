import "../styles.css";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";


console.log("Hello from dashboard")

onAuthStateChanged(auth, async (user) => {
  if (!user) {
      console.log("No user is logged in");
      window.location.href = "/index.html";  // Redirect to login page
      return;
  }

  try {
      const docRef = doc(db, "users", user.uid); // Use Firebase's `user.uid`
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          const userData = docSnap.data();
          generateDashboardUi(userData.name, userData.email);
      } else {
          console.log("No document found matching id");
      }
  } catch (error) {
      console.error("Error getting document:", error);
  }
});

// const logoutButton=document.getElementById('logout');

// logoutButton.addEventListener('click',()=>{
//   localStorage.removeItem('loggedInUserId');
//   signOut(auth)
//   .then(()=>{
//       window.location.href='index.html';
//   })
//   .catch((error)=>{
//       console.error('Error Signing out:', error);
//   })
// })



function generateDashboardUi(name,email){
        let container = document.querySelector('.dashboard-container');
    const htmlTag = document.getElementsByTagName("html")[0];
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
          <div id="signIn" class="flex h-full w-full flex-col space-y-6">
            <p>Hello ${name}. You are now loggen in with the email adress: ${email}</p>
          
          </div>
    
   
          
        
            `;


  container.innerHTML = html;
  console.log("Dashboard Ui generated")
}

