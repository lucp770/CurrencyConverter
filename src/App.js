import React,{useEffect,useState} from 'react'
import './App.css';
import CurrencySelector from './Components/CurrencySelector';

const ENDPOINT ='https://api.apilayer.com/exchangerates_data/latest'
const options = {method: 'GET', headers:{apikey: '4AQVAzG8vLgDqFvImylPxmAPJZxWGwIg'}}

function App() {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFrom, setAmountInFrom] = useState(true);
  const [rateExchange, setRateExchange] = useState(1);

  // define variables to store temporary the values in from and to.
  let toAmount, fromAmount;
  // if the amount typed is in the upper row.(amountInFrom ==true)
  if(amountInFrom){
    fromAmount = amount;
    toAmount = amount * rateExchange;

  }else{
    toAmount = amount;
    fromAmount = amount / rateExchange;
  }

  useEffect(()=>{
    fetch(ENDPOINT, options).then(response => response.json())
    .then(jsonResponse => {
      const firstCurrency = Object.keys(jsonResponse.rates)[0];
      console.log('resposta: ', jsonResponse);

      setCurrencyOption([...Object.keys(jsonResponse.rates)])
      setFromCurrency(jsonResponse.base);
      setToCurrency(firstCurrency);
      setRateExchange(jsonResponse.rates[firstCurrency]);

    })

  },[])

  // the following useEffect handles to choice of currency to convert from and to
  useEffect(()=>{

    if(fromCurrency != undefined && toCurrency != undefined){
      try{
        let url = "https://api.apilayer.com/exchangerates_data/convert?to="+toCurrency+"&from="+fromCurrency+"&amount="+amount;
      
        fetch(url,{method: 'GET', headers:{apikey: '4AQVAzG8vLgDqFvImylPxmAPJZxWGwIg'}}
    ).then(response => response.json())
     .then(res => {
      setRateExchange(res.result)
      
          }) 
      }
      catch(error){
        console.log(error);
      }

    }

  },[fromCurrency, toCurrency])

  function fromAmountChange(event){
    /* this function is invoked every time the user change the first input,
    because of that we have to set the AmountInFrom to true */

    setAmount(event.target.value);//redefine the amount to convert from
    setAmountInFrom(true);
  }

  function toAmountChange(event){
    let allowed_characters =['0','1','2','3','4', '5', '6', '7','8', '9', ',','.'];
    let value = event.target.value;
    console.log(value[value.length]);
    if (allowed_characters.includes(value[value.length])){
      console.log(value[value.length]);

      setAmount(event.target.value);
      setAmountInFrom(false);//the user changed the second input, therefore we set to false.
    }

    else{
      alert('only numbers');
    }
  }


  return (
    <div>
      <h1> Currency Convertor</h1>
      <div className = "main-container">
      <h3> select a currency and a value to convert </h3>
        <CurrencySelector selectedCurrency = {fromCurrency} options = {currencyOption}
        currencySelection ={event => setFromCurrency(event.target.value)} amount = {fromAmount}
        changeCurrencyAmount = {fromAmountChange}/>
        <div>=</div>
        <CurrencySelector selectedCurrency = {toCurrency} options = {currencyOption}
         currencySelection ={event => setToCurrency(event.target.value)} amount = {toAmount}
         changeCurrencyAmount = {toAmountChange}/>
       
      </div>
    </div>
  );
}

export default App;
