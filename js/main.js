var nameInput = document.getElementById("nameInput");
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var UserList = [];

if (localStorage.getItem("UserList") != null) {
    UserList = JSON.parse(localStorage.getItem("UserList"));
}

function addUser() {
    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");

    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";

    if (nameInput.value === "") {
        nameError.style.display = "block";
        return;
    }

    if (emailInput.value === "" || !emailInput.checkValidity()) {
        emailError.style.display = "block";
        return;
    }

    if (passwordInput.value === "") {
        passwordError.style.display = "block";
        return;
    }

    var existingUser = UserList.find(function(user) {
        return user.email === emailInput.value;
    });

    if (existingUser) {
        alert("Email already exists. Please use a different email address.");
        return;
    }

    var newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    UserList.push(newUser);
    localStorage.setItem("UserList", JSON.stringify(UserList));
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";

    alert("Account created successfully!");
}

function loginUser() {
    var loginEmailInput = document.getElementById("loginEmailInput");
    var loginPasswordInput = document.getElementById("loginPasswordInput");

    var email = loginEmailInput.value;
    var password = loginPasswordInput.value;
    var storedUserList = JSON.parse(localStorage.getItem("UserList")) || [];
    var loggedInUser = storedUserList.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (loggedInUser) {
        alert("Login successful! Welcome, " + loggedInUser.name);
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

function toggleForm() {
    var signUpForm = document.getElementById("form");
    var signInForm = document.getElementById("loginForm");
    var formTitle = document.getElementById("formTitle");

    if (signUpForm.style.display === "block") {
        signUpForm.style.display = "none";
        signInForm.style.display = "block";
        formTitle.innerText = "Sign In";
    } else {
        signUpForm.style.display = "block";
        signInForm.style.display = "none";
        formTitle.innerText = "Create Account";
    }
}