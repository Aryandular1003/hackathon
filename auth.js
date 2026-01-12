import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/*  FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyCRpmxKDFR7PpuisfrcNV8r0rav_gx91Ag",
  authDomain: "kirito-95151.firebaseapp.com",
  projectId: "kirito-95151",
  storageBucket: "kirito-95151.firebasestorage.app",
  messagingSenderId: "411337155114",
  appId: "1:411337155114:web:f7fcedc21a86fd9c1a9953"
};

/*  INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/*  SIGNUP */
window.signup = function () {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const msgEl = document.getElementById("msg");

  if (!emailEl || !passwordEl) {
    if (msgEl) msgEl.innerText = "Form elements not found.";
    console.error("Signup failed: missing form elements");
    return;
  }

  const email = emailEl.value;
  const password = passwordEl.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => { if (msgEl) msgEl.innerText = err.message; else console.error(err); });
};

/*  LOGIN */
window.login = function () {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const msgEl = document.getElementById("msg");

  if (!emailEl || !passwordEl) {
    if (msgEl) msgEl.innerText = "Form elements not found.";
    console.error("Login failed: missing form elements");
    return;
  }

  const email = emailEl.value;
  const password = passwordEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => { if (msgEl) msgEl.innerText = err.message; else console.error(err); });
};

/*  GOOGLE LOGIN */
const provider = new GoogleAuthProvider();
window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => alert(err.message));
};

/*  LOGOUT */
window.logout = function () {
  signOut(auth).then(() => window.location.href = "login.html");
};

/*  PROTECT DASHBOARD */
onAuthStateChanged(auth, user => {
  if (window.location.pathname.includes("dashboard")) {
    if (!user) window.location.href = "login.html";
  }
});

