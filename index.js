'use strict';

// Calculate tip
function calcTip(bill, perc, numPeople) {
	return bill * perc / numPeople;
}

// Calculate total
function calcTotal(bill, perc, numPeople) {
	return bill / numPeople + calcTip(bill, perc, numPeople);
}

// Refresh results
function refreshResults(tip, total) {
	const tipLabelResult = document.querySelector("#tip-amount-result");
	const totalLabelResult = document.querySelector("#total-result");
	tipLabelResult.innerHTML = "$" + tip.toFixed(2);
	totalLabelResult.innerHTML = "$" + total.toFixed(2);
}

// Assign events to their respective elements
function loadEvents() {
	// Elements
	const billInput = document.querySelector("#bill-input");
	const numPeopleInput = document.querySelector("#num-people-input");
	const percRadios = document.querySelectorAll(".tip-percs input[type=radio]");
	const percCustom = document.querySelector("#perc-custom");

	// Current values
	let currPerc = (() =>  {
		percRadios[2].checked = true;
		return parseFloat(percRadios[2].value);
	})();
	let bill = (billInput.value != "" ? parseFloat(billInput.value) : 0.0);
	let numPeople = (numPeopleInput.value != "" ? parseInt(numPeopleInput.value) : 1);

	for (let i = 0; i < percRadios.length; i++) {
		// Set current percentage
		if (percRadios[i].checked) currPerc = percRadios[i].value;

		percRadios[i].addEventListener("change", () => {
			if (percRadios[i].checked) {
				currPerc = parseFloat(percRadios[i].value);
				percCustom.value = "";
				percCustom.disabled = true;
			}

			refreshResults(
				calcTip(bill, currPerc, numPeople),
				calcTotal(bill, currPerc, numPeople)
			);
		});
	}

	billInput.addEventListener("input", () => {
		bill = (billInput.value != "" ? parseFloat(billInput.value) : 0.0);
		numPeople = (numPeopleInput.value != "" ? parseInt(numPeopleInput.value) : 1);
		refreshResults(
			calcTip(bill, currPerc, numPeople),
			calcTotal(bill, currPerc, numPeople)
		);
	});

	numPeopleInput.addEventListener("input", () => {
		if (numPeopleInput.value === "0") {
			document.querySelector(".error-msg").innerHTML = "Can't be zero";
		} else {
			document.querySelector(".error-msg").innerHTML = "";
			bill = (billInput.value != "" ? parseFloat(billInput.value) : 0.0);
			numPeople = (numPeopleInput.value != "" ? parseInt(numPeopleInput.value) : 1);
			refreshResults(
				calcTip(bill, currPerc, numPeople),
				calcTotal(bill, currPerc, numPeople)
			);
		}
	});

	percCustom.addEventListener("input", () => {
		bill = (billInput.value != "" ? parseFloat(billInput.value) : 0.0);
		numPeople = (numPeopleInput.value != "" ? parseInt(numPeopleInput.value) : 1);
		currPerc = (percCustom.value != "" ? parseFloat(percCustom.value) / 100 : 0);
		refreshResults(
			calcTip(bill, currPerc, numPeople),
			calcTotal(bill, currPerc, numPeople)
		);
	});
}

loadEvents();
