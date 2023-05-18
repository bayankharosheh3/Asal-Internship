let email = document.getElementById("inputEmail");
let password = document.getElementById("inputPass");
let errorEmail = document.getElementById("errorEmail");
let errorPassword = document.getElementById("errorPassword");
let signIn = document.getElementById("signInBtn");
let error = document.getElementById("error");
let users = JSON.parse(localStorage.getItem("users"));

const checkLoggedIn = () => {
  if (users && users.some((user) => user.loggedIn)) {
    location.replace("profilePage.html");
  }
};

const checkData = (e) => {
  e.preventDefault();

  if (users) {
    let result = users.map((user) => {
      if (user.email == email.value && user.password == password.value) {
        user.loggedIn = true;
        location.replace("profilePage.html");
      } else {
        error.style.visibility = "visible";
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(result));
  } else {
    error.style.visibility = "visible";
  }
};

signIn.addEventListener("click", checkData);

checkLoggedIn();
