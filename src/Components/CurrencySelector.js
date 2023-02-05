import {React,useRef} from 'react'


function CurrencySelector(props){
	const selectDiv = useRef();
	//by setting the ref to the select, in every render the same select is gonna be atributed the variable selectObj

	const {selectedCurrency, options, currencySelection, amount,changeCurrencyAmount} = props;

function checkKeyValid(e){
let allowedKeys = ['0', '1', '2','3','4','5','6', '7', '8', '9', '.','Backspace'];
	if (!allowedKeys.includes(e.key)){
	
		e.preventDefault();

	}
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