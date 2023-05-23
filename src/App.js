import { func } from "prop-types";
import { useState, useEffect } from "react";

 function App(){
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState('');
  const [chosenCoin, setChosenCoin] = useState(1);
  const onChange = (event) => setDollar(event.target.value);
  const onChangeSelect = (event) => setChosenCoin(event.target.value);
  console.log(chosenCoin);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => 
    setCoins(json));    
    setLoading(false);
  },[]);
  return (
    <div>
      <h1>The Coin! ({coins.length} coins)</h1>
      <label for="coins">Choose a coin:</label>
      {loading ? <strong>Loading...</strong> :       
        <select onChange={onChangeSelect}>
          {coins.map( (coin, index)  => 
          <option
            key = {index}
            value={coin.quotes.USD.price}
            id={coin.symbol}
            symbol = {coin.symbol}
          >
            {coin.name} ({coin.symbol}) :  {coin.quotes.USD.price} USD </option>)}
        </select>
      }     
        <br />
        <lable>How much USD would you like to spend on purchasing the Bitcoin?</lable>
        <input 
          onChange={onChange} 
          value={dollar} 
          placeholder="Please Write your USD..."
          type="number"
        />  
      {dollar ===0? null:<h3>You could buy {Math.round( dollar / chosenCoin)} coins</h3> }  
    </div>
  );
 }
export default App;