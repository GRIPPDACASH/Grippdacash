const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const authBtn = document.getElementById("authBtn");
const toggleText = document.getElementById("toggleText");
const toggleForm = document.getElementById("toggleForm");

let isLogin = true;

toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.innerText = isLogin ? "Login" : "Sign Up";
  authBtn.innerText = isLogin ? "Login" : "Sign Up";
  toggleText.innerHTML = isLogin
    ? `Don't have an account? <a href="#" id="toggleForm">Sign Up</a>`
    : `Already have an account? <a href="#" id="toggleForm">Login</a>`;
});

authForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (isLogin) {
    const user = users.find(
      u => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials!");
    }
  } else {
    if (users.find(u => u.email === email)) {
      alert("User already exists.");
      return;
    }
    const newUser = {
      username,
      email,
      password,
      balance: 0,
      tapBalance: 0,
      history: [],
      id: Date.now()
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created! You can log in now.");
    isLogin = true;
    toggleForm.click();
  }
});