const handleRegistration = (event) => {
  event.preventDefault();
  const username = get_value("username");
  const first_name = get_value("first_name");
  const last_name = get_value("last_name");
  const email = get_value("email");
  const password = get_value("password");
  const confirm_password = get_value("confirm_password");
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };

  if (password === confirm_password) {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      console.log(info);
      fetch("https://dish-discovery-backend.onrender.com/register/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      document.getElementById("success").innerText = "Sign up successful!";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500); // Redirect to login page after 2 seconds
    } else {
      document.getElementById("error").innerText =
        "Password must contain eight characters, at least one letter, one number and one special character";
    }
  } else {
    document.getElementById("error").innerText =
      "Password and confirm password does not match";
  }
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = get_value("login_username");
  const password = get_value("login_password");
  console.log(username, password);

  if ((username, password)) {
    fetch("https://dish-discovery-backend.onrender.com/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.token && data.user_id) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("authenticated", "true");
          document.getElementById("success").innerText = "Login Successfull !";
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Login Error :", error);
        document
          .getElementById("login_eror")
          .innerText("Username and Password are required");
      });
  } else {
    document.getElementById("login_error").innerText = "Wrong Credentials";
  }
};

const handleLogout = () => {
  const token = localStorage.getItem("token");

  fetch("https://dish-discovery-backend.onrender.com/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.setItem("authenticated", "false");
      window.location.href = "login.html";
    });
};

const get_value = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const isAuthenticated = () => {
  return localStorage.getItem("authenticated") === "true";
};

const updateNavbar = () => {
  const authButtons = document.getElementById("auth-buttons");
  if (isAuthenticated()) {
    // If authenticated, show the logout button
    authButtons.innerHTML = `
          <li class="nav-item">
              <a class="nav-link" href="#" onclick="handleLogout()">Logout</a>
          </li>
      `;
  } else {
    // If not authenticated, show the login and sign up buttons
    authButtons.innerHTML = `
          <li class="nav-item">
              <a class="nav-link" href="login.html">Login</a>
          </li>
          <li class="nav-item">
              <a class="nav-link btn btn-primary" href="registration.html">Sign Up</a>
          </li>
      `;
  }
};

document.addEventListener("DOMContentLoaded", updateNavbar);
