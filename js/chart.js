// ----------------- Chart Code -------------------------//
// This will generate a chart based on the amount of orders the user has made

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
	getDatabase,
	ref,
	child,
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
const db = getDatabase(app);

const inLocalStorage = localStorage.getItem("user");
const inSessionStorage = sessionStorage.getItem("user");

let currentUser;

if (inLocalStorage) {
	currentUser = JSON.parse(inLocalStorage);
} else if (inSessionStorage) {
	currentUser = JSON.parse(inSessionStorage);
}

//Parse package data
async function getData() {
	// ---------------------------Get a data set/set of packages --------------------------
	// Must be an async function because you need to get all the data from FRD
	// before you can process it for a table or graph

	async function getDataSet(userID) {
		const returnDataKeys = [];
		const returnDataValues = [];

		const dbref = ref(db); //firebase parameter required for 'get'

		//wait for all data to be pulled from the frd
		//provide path through the nodes to the data
		await get(child(dbref, `users/${userID}/data/`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					// console.log("THE SNAPSHOT" + snapshot.val());
					//get the data from the snapshot
					snapshot.forEach((child) => {
						// console.log("THE SNAPSHOT" + child, child.key, child.val());
						returnDataKeys.push(child.key);
						console.log("RETURNED:" + Object.keys(child.val()));
						returnDataValues.push(Object.keys(child.val()));
					});
				} else {
					alert("No Packages were Found!");
				}
			})
			.catch((error) => {
				alert(`Error: ${error}`);
			});

		var result = {};
		returnDataKeys.forEach((key, i) => (result[key] = returnDataValues[i]));

		return result;
	}

	const data = await getDataSet(currentUser.accountInfo.uid);

	return returnDataSet(data);
}

function returnDataSet(data) {
	let valueArray = [];
	let nameArray = [];
	for (const [key, value] of Object.entries(data)) {
		let sum = 0;
		for (let i = 0; i < value.length; i++) {
			sum += value[i];
		}
		valueArray.push(sum);
		nameArray.push(key);
	}

	return [valueArray, nameArray];
}

//Actual chart creation
async function createChart() {
	const data = await getData(); //createChart() will wait until getData() processes
	// Configured for chart.JS 3.x and above

	const ctx = document.getElementById("myChart");
	const myChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: data[1],
			datasets: [
				{
					data: data[0],
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(255, 159, 64, 0.2)",
						"rgba(255, 205, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(201, 203, 207, 0.2)",
					],
					borderColor: [
						"rgb(255, 99, 132)",
						"rgb(255, 159, 64)",
						"rgb(255, 205, 86)",
						"rgb(75, 192, 192)",
						"rgb(54, 162, 235)",
						"rgb(153, 102, 255)",
						"rgb(201, 203, 207)",
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: true, // Re-size based on screen size
			labels: {
				font: { family: "Fira Mono, sans-serif" },
			},
			scales: {
				// x & y axes display options
				x: {
					title: {
						display: true,
						text: "Package Type",
						font: { family: "Fira Mono, sans-serif", size: 20 },
					},
				},
				y: {
					max: 5,
					min: 0,
					ticks: {
						stepSize: 1,
					},
					title: {
						display: true,
						text: "Quantity Purchased",
						font: { family: "Fira Mono, sans-serif", size: 20 },
					},
					// ticks: {
					//   maxTicksLimit: data[1].length / 2,
					// },
				},
			},
			plugins: {
				// title and legend display options
				title: {
					display: true,
					text: currentUser.accountInfo.fullName + "'s Data",
					font: { family: "Fira Mono, sans-serif", size: 24 },
					padding: {
						top: 10,
						bottom: 30,
					},
				},
				legend: {
					display: false,
				},
			},
		},
	});
}

createChart();
