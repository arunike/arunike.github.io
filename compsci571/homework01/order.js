const ITEMS = ["bagel", "donut", "muffin", "pie", "cake"]

const SALES_TAX = {
	AL:	0.040,
	AK:	0.000,
	AZ:	0.056,
	AR:	0.065,
	CA:	0.073,
	CO:	0.029,
	CT:	0.064,
	DE:	0.000,
	DC:	0.060,
	FL:	0.060,
	GA:	0.040,
	HI:	0.040,
	ID:	0.060,
	IL:	0.063,
	IN:	0.070,
	IA:	0.060,
	KS:	0.065,
	KY:	0.060,
	LA:	0.045,
	ME:	0.055,
	MD:	0.060,
	MA:	0.063,
	MI:	0.060,
	MN:	0.069,
	MS:	0.070,
	MO:	0.042,
	MT:	0.000,
	NE:	0.055,
	NV:	0.069,
	NH:	0.000,
	NJ:	0.066,
	NM:	0.051,
	NY:	0.040,
	NC:	0.048,
	ND:	0.050,
	OH:	0.058,
	OK:	0.045,
	OR:	0.000,
	PA:	0.060,
	RI:	0.070,
	SC:	0.060,
	SD:	0.045,
	TN:	0.070,
	TX:	0.063,
	UT:	0.061,
	VT:	0.060,
	VA:	0.053,
	WA:	0.065,
	WV:	0.060,
	WI:	0.050,
	WY:	0.040,
}

function roundMoney(num) {
	return Math.round(num * 100) / 100;
}

function calculateSubtotal() {
	// TODO calculateSubtotal
	let subtotal = 0;

    for (let item of ITEMS) {
        const quantity = parseInt(document.getElementById(item + "-quantity").value);
        const price = parseFloat(document.getElementById(item + "-price").innerText);
        subtotal += quantity * price;
    }

    return roundMoney(subtotal);
}

function calculateSalesTax() {
	// TODO calculateSalesTax
	const subtotal = calculateSubtotal();
    const state = document.getElementById("state-tax").value;
    const taxRate = getSalesTaxRateForState(state);
    const salesTax = subtotal * taxRate;
	
    return roundMoney(salesTax);
}

function getSalesTaxRateForState(state) {
	// TODO getSalesTaxRateForState
	return SALES_TAX[state];
}

document.getElementById("btn-what-is-my-sales-tax").addEventListener("click", () => {
	const state = document.getElementById("state-tax").value;
	alert("The sales tax rate for " + state + " is " + (getSalesTaxRateForState(state) * 100).toFixed(2) + "%");
})

document.getElementById("btn-subtotal").addEventListener("click", () => {
	alert("Your subtotal is: $" + calculateSubtotal().toFixed(2));
});

document.getElementById("btn-sales-tax").addEventListener("click", () => {
	alert("Your sales tax is: $" + calculateSalesTax().toFixed(2));
});

// TODO Add an event listener to btn-checkout
document.getElementById("btn-checkout").addEventListener("click", () => {
	alert("Your total is: $" + (calculateSubtotal() + calculateSalesTax()).toFixed(2));
});



// !!! STOP !!!
// You should not need to modify anything below.
// See Step 7 for using your Badger ID to get today's feature,
// there is no code for you to do beyond here!

fetch("https://cs571.org/api/f23/hw1/featured-baked-good", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
.then(res => {
	if (res.status === 200 || res.status === 304) {
		return res.json()
	} else {
		throw new Error();
	}
})
.then(data => {
	document.getElementById("feature").innerText = `Today's feature is ${data.name} for \$${data.price}, which can only be asked for at the counter!`
})
.catch(err => {
	console.error("Could not get the featured item.")
})
