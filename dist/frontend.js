(() => {
  var e, t, n;
  console.log("hello from frontend js"),
    (e = document.querySelector(".container")),
    (t = document.getElementsByTagName("html")[0]),
    (n = document.body),
    e ||
      (t.classList.add("h-full"),
      n.classList.add(
        "h-full",
        "flex",
        "items-center",
        "justify-center",
        "bg-gray-100",
      ),
      (e = document.createElement("div")).classList.add(
        "container",
        "w-full",
        "max-w-md",
        "bg-white",
        "shadow-md",
        "rounded-lg",
        "p-6",
        "m-2",
      ),
      (e.id = "authContainer"),
      document.body.appendChild(e)),
    (e.innerHTML =
      '\n          <div id="signIn" class="flex flex-col space-y-6">\n    \n    <div class="sm:mx-auto sm:w-full sm:max-w-sm">\n      <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">\n      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>\n    </div>\n    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">\n      \x3c!-- <form class="space-y-6" action="#" method="POST"> --\x3e\n      <form class="space-y-6">\n        <div>\n          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>\n          <div class="mt-2">\n            <input type="email" name="email" id="signInEmail" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">\n          </div>\n        </div>\n\n        <div>\n          <div class="flex items-center justify-between">\n            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>\n            <div class="text-sm">\n              <a href="#" id="passwordReset" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>\n            </div>\n          </div>\n          <div class="mt-2">\n            <input type="password" name="password" id="signInPassword" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">\n          </div>\n        </div>\n\n        <div id="loginDivId" class="hidden" role="alert"></div>\n\n        <div>\n          <button id="signInButton" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>\n        </div>\n      </form>\n\n      <p class="mt-10 text-center text-sm/6 text-gray-500">\n        Not a member?\n        <a href="#" id="signUpLink" class="font-semibold text-indigo-600 hover:text-indigo-500">Create a new account!</a>\n      </p>\n    </div>\n  </div>\n\n\x3c!--Signup section--\x3e\n  <div id="signup" class="hidden flex flex-col space-y-6">\n    <div class="sm:mx-auto sm:w-full sm:max-w-sm">\n     <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">\n      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create a new account</h2>\n    </div>\n    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">\n      \x3c!-- <form class="space-y-6" action="#" method="POST"> --\x3e\n      <form class="space-y-6">\n        <div>\n          <label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>\n          <div class="mt-2">\n            <input type="name" name="name" id="signUpName" autocomplete="name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">\n          </div>\n        </div>\n\n        <div>\n          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>\n          <div class="mt-2">\n            <input type="email" name="email" id="signUpEmail" autocomplete="email" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">\n          </div>\n        </div>\n\n        <div>\n          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>\n\n          <div class="mt-2">\n            <input type="password" name="password" id="signUpPassword" autocomplete="current-password" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">\n          </div>\n        </div>\n\n        <div id="divId" class="hidden" role="alert"></div>\n\n        <div>\n          <button id="signUpBtn" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account</button>\n        </div>\n      </form>\n\n      <p class="mt-10 text-center text-sm/6 text-gray-500">\n        Already had an account?\n        <a href="#" id="signInLink" class="font-semibold text-indigo-600 hover:text-indigo-500">Log in</a>\n      </p>\n    </div>\n  </div>\n</div>\n        \n            '),
    console.log("Login Ui generated");
})();
