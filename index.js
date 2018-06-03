var Result;
var Coins = { "BTC": "", "LTC": "", "XRP": "", "ETH": "", "DASH": "" ,"BCH":"","ENJ":""};
const CoinName = Object.keys(Coins);
var Myportfolio = { "walletValue": 10000000, "TotalValue": 0 };

function getCoin(name) {
	function reqListener() {
		Result = JSON.parse(this.responseText);
		Coins[name] = Result;
		document.getElementById(name).textContent = name + " : INR " + Coins[name].INR;
	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", `https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=USD,INR,EUR`);
	oReq.send();
}

CoinName.forEach(name => {
	getCoin(name);
});


function Buy() {
	name = document.getElementById("bcointype").value;
	result = parseInt(document.getElementById("bcoinnum").value);
	document.getElementById("bcointype").value = "";
	document.getElementById("bcoinnum").value = "";
	if (result * Coins[name].INR > Myportfolio.walletValue)
		alert("Your wallet doesn't has enough Cash!")
	else {
		Myportfolio[name] = { "numofcoins": result, "value": result * Coins[name].INR };
		Myportfolio.walletValue = Myportfolio.walletValue - result * Coins[name].INR;
		Myportfolio.TotalValue = Myportfolio.TotalValue + result * Coins[name].INR;
		console.log(Myportfolio);
		var ul = document.getElementById("portfolio");
		var li = document.createElement('li');
		li.setAttribute('id', name);
		li.appendChild(document.createTextNode("Bought " + " " + Myportfolio[name].numofcoins + " " + name + " for INR " + Myportfolio[name].value));
		ul.appendChild(li);
		document.getElementById("portfolioValue").textContent = "Total Portfolio Value = " + JSON.stringify(Myportfolio.TotalValue);
		document.getElementById("WalletBalance").textContent = "Wallet Balance = " + JSON.stringify(Myportfolio.walletValue);
	}
}
function Sell() {
	name = document.getElementById("scointype").value;
	result = parseInt(document.getElementById("scoinnum").value);
	document.getElementById("scointype").value = "";
	document.getElementById("scoinnum").value = "";
	if (result > Myportfolio[name].numofcoins)
		alert("You can't sell more than you own!")
	else {
		Myportfolio[name] = { "numofcoins": Myportfolio[name].numofcoins - result, "value": Myportfolio[name].value * Coins[name].INR };
		Myportfolio.walletValue = Myportfolio.walletValue + result * Coins[name].INR;
		Myportfolio.TotalValue = Myportfolio.TotalValue - result * Coins[name].INR;
		var ul = document.getElementById("portfolio");
		var li = document.createElement('li');
		li.setAttribute('id', name);
		li.appendChild(document.createTextNode("Sold " + " " + Myportfolio[name].numofcoins + " " + name + " for INR " + Myportfolio[name].value));
		ul.appendChild(li);
		document.getElementById("portfolioValue").textContent = "Total Portfolio Value = " + JSON.stringify(Myportfolio.TotalValue);
		document.getElementById("WalletBalance").textContent = "Wallet Balance = " + JSON.stringify(Myportfolio.walletValue);
	}
}

