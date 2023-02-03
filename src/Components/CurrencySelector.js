import {React,useRef,useEffect} from 'react'


function CurrencySelector(props){
	const selectObj = useRef();//useRef returns an object called current.
	const selectDiv = useRef();
	//by setting the ref to the select, in every render the same select is gonna be atributed the variable selectObj

	useEffect(()=>{
		console.log('loaded component');
		//create the js code to populate the element.
		// console.log(selectObj.current);
		// createCurrencyList(selectObj.current);

	},[])

	const {selectedCurrency, options, currencySelection, amount,changeCurrencyAmount} = props;
	// options.shift();
	const mySet = new Set(options);
	console.log(options, '\n ', mySet);

	// let date = new Date();

	let firstcoin = options[0];


function checkKeyValid(e){
let allowedKeys = ['0', '1', '2','3','4','5','6', '7', '8', '9', '.','Backspace'];
	if (!allowedKeys.includes(e.key)){
	
		e.preventDefault();

	}
}


function createCurrencyList(select){

	// get the list of items in the select.
	let objectOfOptions = select.children;

	// create a div (div-parent) for the select
	let divForSelect = document.createElement("DIV");
	divForSelect.setAttribute("class", "select-selected");
	// selectDiv.current.appendChild(divForSelect);
	selectDiv.current.innerHTML = '<div class = "select-selected">EUR</div>'


	// create a child div for every element in objectOfOpitons

	// add an event listener in every option to change the state (toCurrency e fromCurrency)

}

function showHideOptions(){

	let classes = selectDiv.current.classList;

	if (classes.contains('select-hide')){
		selectDiv.current.classList.remove('select-hide');
	}
	else{
		selectDiv.current.classList.add('select-hide');
	}
}

	return(
		<div className = "currency-container">
			<input className = "value-input"  value = {amount} onChange ={changeCurrencyAmount} onKeyDown = {e=>checkKeyValid(e)}/>
			<div className = 'selected-option' onClick = {showHideOptions}>{selectedCurrency} <i className="arrow down"></i></div>

			<div className = "custom-select select-hide" ref = {selectDiv} onClick ={showHideOptions}>
				{options.map(optionItem=> (
					<div  className = "select-selected" key = {options.indexOf(optionItem)}  onClick ={currencySelection}>{optionItem}</div>
				))}
	
			</div>
			
		</div>
		)
}


export default CurrencySelector; 