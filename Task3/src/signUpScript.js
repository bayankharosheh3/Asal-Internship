let firstName = document.getElementById("inputFirstName");
let lastName = document.getElementById("inputLastName");
let email = document.getElementById("inputEmail");
let password = document.getElementById("inputPass");
let confirmedPassword = document.getElementById("inputConfirmedPassword");
let age = document.getElementById("inputAge");
let country = document.getElementById("selectCountry");
let save = document.getElementById("saveBtn");

let errorFirstName = document.getElementById("errorFirstName");
let errorLastName = document.getElementById("errorLastName");
let errorEmail = document.getElementById("errorEmail");
let errorPassword = document.getElementById("errorPassword");
let errorConfirmed = document.getElementById("errorConfirmed");
let errorAge = document.getElementById("errorAge");

let users = localStorage.getItem("users") && [
  ...JSON.parse(localStorage.getItem("users")),
];

const checkNameValidation = (field, error) => {
  let pattern = /^[A-Z][a-z]{2,20}$/;
  if (pattern.test(field.value)) {
    field.classList.remove("inValid");
    error.style.visibility = "hidden";
    return true;
  } else {
    field.classList.add("inValid");
    error.style.visibility = "visible";
    return false;
  }
};

const checkEmailValidation = () => {
  let pattern = /^\S+@\S+\.\S+$/;
  if (pattern.test(email.value)) {
    email.classList.remove("inValid");
    errorEmail.style.visibility = "hidden";
    return true;
  } else {
    email.classList.add("inValid");
    errorEmail.style.visibility = "visible";
    return false;
  }
};

const checkPasswordValidation = () => {
  let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (pattern.test(password.value)) {
    password.classList.remove("inValid");
    errorPassword.style.visibility = "hidden";
    return true;
  } else {
    password.classList.add("inValid");
    errorPassword.style.visibility = "visible";
    return false;
  }
};

const checkConfirmPassword = () => {
  if (password.value == confirmedPassword.value) {
    confirmedPassword.classList.remove("inValid");
    errorConfirmed.style.visibility = "hidden";
    return true;
  } else {
    confirmedPassword.classList.add("inValid");
    errorConfirmed.style.visibility = "visible";
    return false;
  }
};

const checkAgeValidation = () => {
  if (age.value > 18) {
    age.classList.remove("inValid");
    errorAge.style.visibility = "hidden";
    return true;
  } else {
    age.classList.add("inValid");
    errorAge.style.visibility = "visible";
    return false;
  }
};

const saveUser = (e) => {
  e.preventDefault();
  if (
    checkNameValidation(firstName, errorFirstName) &&
    checkNameValidation(lastName, errorLastName) &&
    checkEmailValidation() &&
    checkPasswordValidation() &&
    checkConfirmPassword() &&
    checkAgeValidation()
  ) {
    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      age: age.value,
      country: country.value,
      loggedIn: false,
    };
    users ? (users = [...users, user]) : (users = [user]);
    localStorage.setItem("users", JSON.stringify(users));
    alert("data saved, sign in please");
    resetInputs();
    document.getElementById("error").style.visibility = "hidden";
    location.replace("index.html");
  } else {
    document.getElementById("error").style.visibility = "visible";
  }

  console.log(users);
};

const resetInputs = () => {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  confirmedPassword.value = "";
  age.value = "";
  country.value = "";
};

save.addEventListener("click", saveUser);

// firstName.addEventListener("keyup", () =>
//   checkNameValidation(firstName, errorFirstName)
// );

// lastName.addEventListener("keyup", () =>
//   checkNameValidation(lastName, errorLastName)
// );

// email.addEventListener("keyup", checkEmailValidation);

// password.addEventListener("keyup", checkPasswordValidation);

// confirmedPassword.addEventListener("keyup", checkConfirmPassword);
