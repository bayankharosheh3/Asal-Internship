let firstName = document.getElementById("inputFirstName");
let lastName = document.getElementById("inputLastName");
let email = document.getElementById("inputEmail");
let password = document.getElementById("inputPass");
let confirmedPassword = document.getElementById("inputConfirmedPassword");
let age = document.getElementById("inputAge");
let country = document.getElementById("selectCountry");
let edit = document.getElementById("editBtn");
let save = document.getElementById("saveBtn");
let signOutBtn = document.getElementById("signOutBtn");

let errorFirstName = document.getElementById("errorFirstName");
let errorLastName = document.getElementById("errorLastName");
let errorEmail = document.getElementById("errorEmail");
let errorPassword = document.getElementById("errorPassword");
let errorConfirmed = document.getElementById("errorConfirmed");

let index1 = 0;
let users = [...JSON.parse(localStorage.getItem("users"))];

const checkLoggedIn = () => {
  if (users && users.every((user) => !user.loggedIn)) {
    location.replace("index.html");
  }
};

const disableFields = () => {
  firstName.disabled = true;
  lastName.disabled = true;
  email.disabled = true;
  password.disabled = true;
  confirmedPassword.disabled = true;
  age.disabled = true;
  country.disabled = true;

  firstName.style.backgroundColor = "#dfe2e5";
  lastName.style.backgroundColor = "#dfe2e5";
  email.style.backgroundColor = "#dfe2e5";
  password.style.backgroundColor = "#dfe2e5";
  confirmedPassword.style.backgroundColor = "#dfe2e5";
  age.style.backgroundColor = "#dfe2e5";
  country.style.backgroundColor = "#dfe2e5";
};

const displayData = () => {
  let loggedInUser = users.find((user) => user.loggedIn);
  index1 = users.findIndex((user) => user.loggedIn == true);
  firstName.value = loggedInUser.firstName;
  lastName.value = loggedInUser.lastName;
  email.value = loggedInUser.email;
  password.value = loggedInUser.password;
  confirmedPassword.value = loggedInUser.password;
  age.value = loggedInUser.age;
  country.value = loggedInUser.country;
  console.log(loggedInUser);
};

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

const editData = () => {
  firstName.disabled = false;
  lastName.disabled = false;
  email.disabled = false;
  password.disabled = false;
  confirmedPassword.disabled = false;
  age.disabled = false;
  country.disabled = false;

  firstName.style.backgroundColor = "#fff";
  lastName.style.backgroundColor = "#fff";
  email.style.backgroundColor = "#fff";
  password.style.backgroundColor = "#fff";
  confirmedPassword.style.backgroundColor = "#fff";
  age.style.backgroundColor = "#fff";
  country.style.backgroundColor = "#fff";
};

const saveData = (e) => {
  e.preventDefault();

  if (
    checkNameValidation(firstName, errorFirstName) &&
    checkNameValidation(lastName, errorLastName) &&
    checkEmailValidation() &&
    checkPasswordValidation() &&
    checkConfirmPassword() &&
    checkAgeValidation()
  ) {
    const newData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      age: age.value,
      country: country.value,
    };

    let result = users.map((user, index) => {
      if (index == index1) {
        user = { ...newData };
      }
      console.log(index);
      return user;
    });

    console.log(result);
    localStorage.setItem("users", JSON.stringify(result));
    alert("data saved");
  }

  disableFields();
};

const signOut = () => {
  const newData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    age: age.value,
    country: country.value,
    loggedIn: false,
  };

  let result = users.map((user, index) => {
    if (index == index1) {
      user = { ...newData };
    }
    console.log(index);
    return user;
  });

  console.log(result);
  localStorage.setItem("users", JSON.stringify(result));
  location.replace("index.html");
};

edit.addEventListener("click", editData);
save.addEventListener("click", saveData);
signOutBtn.addEventListener("click", signOut);

// firstName.addEventListener("keyup", () =>
//   checkNameValidation(firstName, errorFirstName)
// );

// lastName.addEventListener("keyup", () =>
//   checkNameValidation(lastName, errorLastName)
// );

// email.addEventListener("keyup", checkEmailValidation);

// password.addEventListener("keyup", checkPasswordValidation);

// confirmedPassword.addEventListener("keyup", checkConfirmPassword);

checkLoggedIn();
displayData();
disableFields();
