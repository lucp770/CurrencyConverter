import React from 'react'


function CurrencySelector(props){
	const {selectedCurrency, options, currencySelection, amount,changeCurrencyAmount} = props;
	// options.shift();
	const mySet = new Set(options);
	console.log(options, '\n ', mySet);

	// let date = new Date();

	let firstcoin = options[0];


function checkKeyValid(e){
let allowedKeys = ['0', '1', '2','3','4','5','6', '7', '8', '9', '.',',','Backspace'];
	if (!allowedKeys.includes(e.key)){
	
		e.preventDefault();

	}
}

	return(
		<>
			<input type ="number" value = {amount} onChange ={changeCurrencyAmount} onKeyDown = {e=>checkKeyValid(e)}/>
			<select value={selectedCurrency} onChange = {currencySelection}>
			{options.map(optionItem=> (
				<option key = {options.indexOf(optionItem)} value = {optionItem}>{optionItem}</option>
			))}
			</select>
		</>
		)
}


export default CurrencySelector; 