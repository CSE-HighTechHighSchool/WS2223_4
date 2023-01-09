// ----------------- User Sign in, Registration, and Storage Code-------------------------//
//Provides functionality for signin/registration modals.
//All non-sign-in/registration pages will use this code to access user state

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

import {
	getAuth,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import {
	getDatabase,
	ref,
	set,
	update,
	get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDnmczPBWQf9smRWOG4XjLgSBbTOoxxDDs",
	authDomain: "saturn-tourism.firebaseapp.com",
	databaseURL: "https://saturn-tourism-default-rtdb.firebaseio.com",
	projectId: "saturn-tourism",
	storageBucket: "saturn-tourism.appspot.com",
	messagingSenderId: "815863658167",
	appId: "1:815863658167:web:9160711683385788f63f32",
	measurementId: "G-Q32GDCBQ6Y",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

/* Update signed in menu */
const greetingLarge = document.getElementById("greetingLarge");
const signOutLarge = document.getElementById("signOutLarge");
const loginLarge = document.getElementById("loginLarge");

const greetingMedium = document.getElementById("greetingMedium");
const signOutMedium = document.getElementById("signOutMedium");
const loginMedium = document.getElementById("loginMedium");

// ----------------- User Sign in, Registration, and Storage Code-------------------------//
function updateSignedIn(user) {
	try {
		if (user) {
			greetingLarge.innerHTML = `Hello, ${user.accountInfo.fullName}!`;
			greetingMedium.innerHTML = `Hello, ${user.accountInfo.fullName}!`;

			greetingLarge.classList.add("d-md-inline-block");
			signOutLarge.classList.add("d-md-inline-block");
			loginLarge.classList.remove("d-md-inline-block");

			greetingMedium.classList.add("d-inline-block");
			signOutMedium.classList.add("d-inline-block");
			loginMedium.classList.add("d-none");
		} else {
			throw new Error("User is not signed in");
		}
	} catch {
		/*Prevent "Hello, undefined" */
		greetingLarge.innerHTML = "Hello, Guest!";
		greetingMedium.innerHTML = "Hello, Guest!";

		greetingLarge.classList.remove("d-md-inline-block");
		signOutLarge.classList.remove("d-md-inline-block");
		loginLarge.classList.add("d-md-inline-block");

		greetingMedium.classList.remove("d-inline-block");
		signOutMedium.classList.remove("d-inline-block");
		loginMedium.classList.remove("d-none");
	}
}

/*Retreive user information*/
const inLocalStorage = localStorage.getItem("user");
const inSessionStorage = sessionStorage.getItem("user");

const page = window.location.pathname.split("/").pop();

if (inLocalStorage) {
	updateSignedIn(JSON.parse(inLocalStorage));
} else if (inSessionStorage) {
	updateSignedIn(JSON.parse(inSessionStorage));
} else if (page === "purchases.html") {
	alert("You must be signed in to view this page!");
	window.location.href = "../index.html";
}

/* Login user */
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginRememberMe = document.getElementById("loginRememberMe");

const handleError = (error) => alert(`${error.code} - ${error.message}`);

document.getElementById("loginButton").addEventListener("click", (e) => {
	e.preventDefault();

	const email = loginEmail.value,
		password = loginPassword.value,
		remember = loginRememberMe.checked;

	/*Firebase Signin */
	signInWithEmailAndPassword(auth, email + "@ctemc.org", password)
		.then(({ user }) =>
			update(ref(database, `users/${user.uid}/accountInfo`), {
				lastSignedIn: Date.now(),
			})
				.then(() => get(ref(database, `users/${user.uid}`)))
				.catch(handleError)
		)
		.then((snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();
				updateSignedIn(data);

				(remember ? localStorage : sessionStorage).setItem(
					"user",
					JSON.stringify(data)
				);

				alert("Signed in successfully!");

				if (page === "index.html") {
					window.location.reload();
				} else {
					window.location = "../pages/purchases.html";
				}
			}
		})
		.catch(handleError);
});

/* Register user */
const fullName = document.getElementById("fullName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerRememberMe = document.getElementById("registerRememberMe");

const validateName = (s) => s && /^[a-zA-Z]+ [a-zA-Z]+$/.test(s);
const validateEmail = (s) => s && /^[a-z]+$/.test(s);
const validatePassword = (s) => s && s.length >= 6;

document.getElementById("registerButton").addEventListener("click", (e) => {
	e.preventDefault();

	const name = fullName.value,
		email = registerEmail.value,
		password = registerPassword.value,
		remember = registerRememberMe.checked;

	if (
		!validateName(name) ||
		!validateEmail(email) ||
		!validatePassword(password)
	) {
		alert("Please enter valid values for every field.");
		return;
	}

	/*Firebase Registration */
	createUserWithEmailAndPassword(auth, email + "@ctemc.org", password)
		.then(({ user }) => {
			const time = Date.now();

			return set(ref(database, `users/${user.uid}`), {
				accountInfo: {
					uid: user.uid,
					fullName: name,
					lastSignedIn: time,
					accountCreated: time,
					email: email + "@ctemc.org",
				},
			})
				.then(() => get(ref(database, `users/${user.uid}`)))
				.catch(handleError);
		})
		.then((snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();
				updateSignedIn(data);

				(remember ? localStorage : sessionStorage).setItem(
					"user",
					JSON.stringify(data)
				);

				alert("Account created successfully!");

				if (page === "index.html") {
					window.location.reload();
				} else {
					window.location = "../pages/purchases.html";
				}
			}
		})
		.catch(handleError);
});

/* Sign out user */
function signOutUser(e) {
	e.preventDefault();

	signOut(auth)
		.then(() => {
			localStorage.removeItem("user");
			sessionStorage.removeItem("user");
			updateSignedIn();

			alert("Signed out successfully!");

			if (page === "index.html") {
				window.location.reload();
			} else {
				window.location = "../index.html";
			}
		})
		.catch(handleError);
}

// Listen for sign out user
signOutMedium.addEventListener("click", signOutUser);
signOutLarge.addEventListener("click", signOutUser);
