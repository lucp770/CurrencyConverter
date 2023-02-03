import React,{useEffect,useState} from 'react'
import './App.css';
import CurrencySelector from './Components/CurrencySelector';
import NavBar from './Components/NavBar';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const ENDPOINT ='https://api.apilayer.com/exchangerates_data/latest'
const options = {method: 'GET', headers:{apikey: '4AQVAzG8vLgDqFvImylPxmAPJZxWGwIg'}}

function App() {
  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFrom, setAmountInFrom] = useState(true);
  const [rateExchange, setRateExchange] = useState(1);
  const [loading, setLoading] = useState(true);

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
    try{

      fetch(ENDPOINT, options).then(response => response.json())
      .then(jsonResponse => {
        const firstCurrency = Object.keys(jsonResponse.rates)[0];
        console.log('resposta: ', jsonResponse);

        setCurrencyOption([...Object.keys(jsonResponse.rates)])
        setFromCurrency(jsonResponse.base);
        setToCurrency(firstCurrency);
        setRateExchange(jsonResponse.rates[firstCurrency]);
        setLoading(false);
      })

    }
    catch(error){
      alert('We are sorry! looks like the service is not working right now. \n Please try again latter');
      setLoading(false);
    }

  },[])

  // the following useEffect handles to choice of currency to convert from and to
  useEffect(()=>{

    console.log('from: ',fromCurrency, '\n to: ', toCurrency);
    if(fromCurrency != undefined && toCurrency != undefined){
      try{
        let url = "https://api.apilayer.com/exchangerates_data/convert?to="+toCurrency+"&from="+fromCurrency+"&amount="+amount;
        // create loading screen
        setLoading(true);
        fetch(url,{method: 'GET', headers:{apikey: '4AQVAzG8vLgDqFvImylPxmAPJZxWGwIg'}}
        ).then(response => response.json())
         .then(res => {
          setRateExchange(res.result)
        // remove the loading screen
          setLoading(false);
          }) 
      }
      catch(error){
        console.log(error);
        alert('We are sorry! looks like the service is not working right now. \n Please try again latter');
        setLoading(false);
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
    setAmount(event.target.value);
    setAmountInFrom(false);
  }
  
  return (
    <>
    <NavBar />
    <div className = "parent-container">
      <h2> Select a currency and a value to convert </h2>
      <div className = "select-container">
        <CurrencySelector selectedCurrency = {fromCurrency} options = {currencyOption}
        currencySelection ={event => setFromCurrency(event.target.innerText)} amount = {fromAmount}
        changeCurrencyAmount = {fromAmountChange}/>
        <div className = "equal">=</div>
        <CurrencySelector selectedCurrency = {toCurrency} options = {currencyOption}
         currencySelection ={event => setToCurrency(event.target.innerText)} amount = {toAmount}
         changeCurrencyAmount = {toAmountChange}/>
      </div>
    </div>
    {loading?
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
      <CircularProgress color="inherit" />
    </Backdrop> :null  }
    </>
  );

}

export default App;

// TODO: deploy project
// TODO: Put advertisement in the site.