// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
	getDatabase,
	ref,
	update,
	child,
	get,
	remove,
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

//Return instance of app's FRD
const db = getDatabase(app);

// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById("userLink");
let signOutLink = document.getElementById("signOut");
let welcome = document.getElementById("welcome");

// ----------------------- Get User's Name'Name ------------------------------
/* Get user */
const inLocalStorage = localStorage.getItem("user");
const inSessionStorage = sessionStorage.getItem("user");

let currentUser;

// Check if user is in local or session storage
if (inLocalStorage) {
	currentUser = JSON.parse(inLocalStorage);
} else if (inSessionStorage) {
	currentUser = JSON.parse(inSessionStorage);
}

//Update welcome message with User's name
let header = document.getElementById("packageHeader");

header.innerHTML = `${currentUser.accountInfo.fullName}'s Packages`;

// -------------------------Update data/packages in database --------------------------
function updateData(packageName, packageQuantity, packageNotes, userID) {
	// Set the data
	update(ref(db, `users/${userID}/data/${packageName}/${packageQuantity}`), {
		["Notes"]: packageNotes,
	})
		.then(() => {
			successHandler("Packages Updated Successfully");
		})
		.catch((error) => {
			alertHandler(`Error: ${error.code} - ${error.message}`);
		});
}

document.getElementById("update").onclick = function () {
	const packageName = document.getElementById("PackageName").value;
	const packageQuantity = document.getElementById("PackageQuantity").value;
	const packageNotes = document.getElementById("PackageNotes").value;
	const userID = currentUser.accountInfo.uid;

	updateData(packageName, packageQuantity, packageNotes, userID);
};

// ---------------------------Get a data set/set of packages --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph

async function getDataSet(packageName, userID) {
	// let packageNameVal = document.getElementById("setpackageName");

	// packageNameVal.textContent = `packageName: ${packageName}`;

	const packageQuantity = [];
	const packageNotes = [];
	const tbodyEl = document.getElementById("tbody-2"); //Select <tbody> from table

	const dbref = ref(db); //firebase parameter required for 'get'

	//wait for all data to be pulled from the frd
	//provide path through the nodes to the data
	await get(child(dbref, `users/${userID}/data/${packageName}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				// console.log("THE SNAPSHOT" + snapshot.val());
				//get the data from the snapshot
				snapshot.forEach((child) => {
					// console.log("THE SNAPSHOT" + child, child.key, child.val());
					packageQuantity.push(child.key);
					packageNotes.push(Object.values(child.val())[0]);
				});
			} else {
				alertHandler(
					`No "${packageName.split(",")[0]}" Package Sets Were Found!`
				);
			}
		})
		.catch((error) => {
			alert(`Error: ${error}`);
		});

	//Clear table
	tbodyEl.innerHTML = "";
	//Dynamically add table rows to HTML

	for (let i = 0; i < packageQuantity.length; i++) {
		addItemToTable(
			packageName,
			packageQuantity[i],
			packageNotes[i],
			tbodyEl
		);
	}
}

// Add a item to the table of data
function addItemToTable(packageName, packageQuantity, packageNotes, tbodyEl) {
	let tr = document.createElement("tr");
	let td1 = document.createElement("td");
	let td2 = document.createElement("td");
	let td3 = document.createElement("td");
	let td4 = document.createElement("td");

	let splitName = packageName.split(",");

	td1.innerHTML = splitName[0];
	td2.innerHTML = splitName[1].replace("-", "/");
	td3.innerHTML = packageQuantity;
	td4.innerHTML = packageNotes;

	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);

	tbodyEl.appendChild(tr);
}

// Get a data set function call
document.getElementById("getDataSet").onclick = function () {
	const packageName = document.getElementById("getDatasetPackage").value;
	const userID = currentUser.accountInfo.uid;

	getDataSet(packageName, userID);
};

// -------------------------Delete a package's data from FRD ---------------------

function deleteData(packageName, quantity, userID) {
	remove(ref(db, `users/${userID}/data/${packageName}/${quantity}`))
		.then(() => {
			successHandler("Package Removed Successfully");
		})
		.catch((error) => {
			alertHandler(`Error: ${error}`);
		});
}

// Delete a single day's data function call
document.getElementById("delete").onclick = function () {
	const name = document.getElementById("delName").value;
	const quantity = document.getElementById("delQuantity").value;
	const userID = currentUser.accountInfo.uid;

	deleteData(name, quantity, userID);
};

// ------------------------- Get a Datum (Package) -------------------------

// Get a datum function call
function getDatum(userID, packageName, quantity) {
	// Get the data
	let nameVal = document.getElementById("nameVal");
	let quantityVal = document.getElementById("quantityVal");
	let notesVal = document.getElementById("notesVal");
	let costVal = document.getElementById("costVal");
	const dbref = ref(db);

	get(child(dbref, `users/${userID}/data/${packageName}/${quantity}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				let splitName = packageName.split(",");
				nameVal.textContent = splitName[0];
				costVal.textContent = splitName[1].replace("-", "/");
				quantityVal.textContent = quantity;
				notesVal.textContent = Object.values(snapshot.val())[0];
			} else {
				alertHandler(
					`No "${packageName.split(",")[0]}" packages were Found!`
				);
			}
		})
		.catch((error) => {
			alertHandler(`Error: ${error.code} - ${error.message}`);
		});
}

//Get a datum
document.getElementById("get").onclick = function () {
	const name = document.getElementById("getPackage").value;
	const quantity = document.getElementById("getQuantity").value;

	getDatum(currentUser.accountInfo.uid, name, quantity);
};

function alertHandler(message) {
	let errMessage = document.getElementById("errorMessage");
	let returnMessage = message;

	errMessage.innerHTML = returnMessage;

	let errContainer = document.getElementById("errorContainer");
	errContainer.classList.remove("bg-danger");
	errContainer.classList.remove("bg-success");
	errContainer.classList.add("bg-danger");
	errContainer.classList.remove("d-none");
	setTimeout(function () {
		errContainer.classList.add("d-none");
	}, 3000);
}

function successHandler(message) {
	let errMessage = document.getElementById("errorMessage");
	errMessage.innerHTML = message;

	let errContainer = document.getElementById("errorContainer");
	errContainer.classList.remove("bg-danger");
	errContainer.classList.remove("bg-success");

	errContainer.classList.add("bg-success");
	errContainer.classList.remove("d-none");

	setTimeout(function () {
		errContainer.classList.add("d-none");
	}, 3000);
}
