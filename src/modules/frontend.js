console.log("hello from frontend js");


//the version withoth the modificationd for the modal
// function generateLoginUi() {
//   let container = document.querySelector(".container");
//   const htmlTag = document.getElementsByTagName("html")[0];
//   const bodyTag = document.body;

//   if (!container) {
//     htmlTag.classList.add("h-full");
//     bodyTag.classList.add(
//       "h-full",
//       "flex",
//       "items-center",
//       "justify-center",
//       "bg-gray-100",
//     );

//     container = document.createElement("div");
//     container.classList.add(
//       "container",
//       "w-full",
//       "max-w-md",
//       "bg-white",
//       "shadow-md",
//       "rounded-lg",
//       "p-6",
//       "m-2",
//     );
//     container.id = "authContainer";
//     document.body.appendChild(container);
//   }

//   const html = `
//           <div id="signIn" class="flex flex-col space-y-6">
    
//     <div class="sm:mx-auto sm:w-full sm:max-w-sm">
//       <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
//       <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
//     </div>
//     <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//       <!-- <form class="space-y-6" action="#" method="POST"> -->
//       <form class="space-y-6">
//         <div>
//           <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
//           <div class="mt-2">
//             <input type="email" name="email" id="signInEmail" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
//           </div>
//         </div>

//         <div>
//           <div class="flex items-center justify-between">
//             <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
//             <div class="text-sm">
//               <a href="#" id="passwordReset" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="mb-2 font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>    
//             </div>
              
//           </div>
//           <div class="mt-2">
//             <input type="password" name="password" id="signInPassword" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
//           </div>
//         </div>
//         <div id="loginDivId" class="hidden" role="alert"></div>
                


//         <div>
//           <button id="signInButton" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
//         </div>
//       </form>

//       <p class="mt-10 text-center text-sm/6 text-gray-500">
//         Not a member?
//         <a href="#" id="signUpLink" class="font-semibold text-indigo-600 hover:text-indigo-500">Create a new account!</a>
//       </p>
//     </div>
//   </div>

// <!--Signup section-->
//   <div id="signup" class="hidden flex flex-col space-y-6">
//     <div class="sm:mx-auto sm:w-full sm:max-w-sm">
//       <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
//       <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create a new account</h2>
//     </div>
//     <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//       <!-- <form class="space-y-6" action="#" method="POST"> -->
//       <form class="space-y-6">
//         <div>
//           <label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>
//           <div class="mt-2">
//             <input type="name" name="name" id="signUpName" autocomplete="name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
//           </div>
//         </div>

//         <div>
//           <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
//           <div class="mt-2">
//             <input type="email" name="email" id="signUpEmail" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
//           </div>
//         </div>

//         <div>
//           <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>

//           <div class="mt-2">
//             <input type="password" name="password" id="signUpPassword" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
//           </div>
//         </div>

//         <div id="divId" class="hidden" role="alert"></div>

//         <div>
//           <button id="signUpBtn" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account</button>
//         </div>
//       </form>

//       <p class="mt-10 text-center text-sm/6 text-gray-500">
//         Already had an account?
//         <a href="#" id="signInLink" class="font-semibold text-indigo-600 hover:text-indigo-500">Log in</a>
//       </p>
//     </div>
//   </div>
// </div>
// ${createPasswordResetModal()}
// `;

//   container.innerHTML = html;
//   console.log("Login Ui generated");
// }

function generateLoginUi() {
  let container = document.querySelector(".container");
  const htmlTag = document.getElementsByTagName("html")[0];
  const bodyTag = document.body;

  if (!container) {
    htmlTag.classList.add("h-full");
    bodyTag.classList.add(
      "h-full",
      "flex",
      "items-center",
      "justify-center",
      "bg-gray-100",
    );

    container = document.createElement("div");
    container.classList.add(
      "container",
      "w-full",
      "max-w-md",
      "bg-white",
      "shadow-md",
      "rounded-lg",
      "p-6",
      "m-2",
    );
    container.id = "authContainer";
    document.body.appendChild(container);
  }

  const html = `
          <div id="signIn" class="flex flex-col space-y-6">
    
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <form class="space-y-6" action="#" method="POST"> -->
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="signInEmail" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" id="passwordReset" class="mb-2 font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>    
            </div>
              
          </div>
          <div class="mt-2">
            <input type="password" name="password" id="signInPassword" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>
        <div id="loginDivId" class="hidden" role="alert"></div>
            
        <div>
          <button id="signInButton" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        <a href="#" id="signUpLink" class="font-semibold text-indigo-600 hover:text-indigo-500">Create a new account!</a>
      </p>
    </div>
  </div>

<!--Signup section-->
  <div id="signup" class="hidden flex flex-col space-y-6">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create a new account</h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <form class="space-y-6" action="#" method="POST"> -->
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>
          <div class="mt-2">
            <input type="name" name="name" id="signUpName" autocomplete="name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="signUpEmail" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>

          <div class="mt-2">
            <input type="password" name="password" id="signUpPassword" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          </div>
        </div>

        <div id="divId" class="hidden" role="alert"></div>

        <div>
          <button id="signUpBtn" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Already had an account?
        <a href="#" id="signInLink" class="font-semibold text-indigo-600 hover:text-indigo-500">Log in</a>
      </p>
    </div>
  </div>
</div>
${createPasswordResetModal()}
`;

  container.innerHTML = html;
  console.log("Login Ui generated");
}

function createPasswordResetModal() {
  console.log("Modal created")
  const html = `
    <!-- Main modal -->
      <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-md max-h-full">
              <!-- Modal content -->
              <div class="relative p-4 bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <!-- Modal header -->
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                          Enter account email address
                      </h3>
                      <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  <!-- Modal body -->
                  <form class="p-4 md:p-5">
                      <div class="grid gap-4 mb-4 grid-cols-2">
                          <div class="col-span-2">
                              <label for="reset-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                              <input type="email" name="reset-email" id="reset-email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter email" required>
                          </div>
                          <div id="resetEmailDivId" class="hidden" role="alert"></div>
                        </div>
                      <button id="email-pswd-rest-btn" type="button" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Submit
                      </button>
                  </form>
              </div>
          </div>
      </div> 
  `;

  return html;
}

generateLoginUi();
