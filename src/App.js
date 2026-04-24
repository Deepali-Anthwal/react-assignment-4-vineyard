import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import axios from 'axios';
import './App.css'; 

const PreferencesContext = createContext();

const ExchangeRateDisplay = React.memo(({ base, target, rate }) => (
  <p className="rate-info">
    Current Rate: 1 {base} = {rate?.toFixed(4)} {target}
  </p>
));

const Converter = () => {
  const { preferences } = useContext(PreferencesContext);
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState(preferences.defaultFrom);
  const [toCurrency, setToCurrency] = useState(preferences.defaultTo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        setRates(res.data.rates);
        setLoading(false);
      } catch (err) {
        setError("Could not fetch exchange rates.");
        setLoading(false);
      }
    };
    fetchRates();
  }, [fromCurrency]);

  const convertedAmount = useMemo(() => {
    if (!rates[toCurrency]) return 0;
    return (amount * rates[toCurrency]).toFixed(2);
  }, [amount, rates, toCurrency]);

  if (loading) return <div className="container">Updating real-time rates...</div>;
  if (error) return <div className="container" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="main-box">
      <h2>Convert Currency:</h2>
      
      <div className="input-group">
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(rates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
        </select>
        <span>TO</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(rates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
        </select>
      </div>

      <div className="result-display">
        {convertedAmount} {toCurrency}
      </div>

      <ExchangeRateDisplay base={fromCurrency} target={toCurrency} rate={rates[toCurrency]} />
    </div>
  );
};

function App() {
  const [preferences] = useState({ defaultFrom: 'USD', defaultTo: 'INR' });

  return (
    <PreferencesContext.Provider value={{ preferences }}>
      <div className="container">
        <h1>Real Time Currency Converter</h1>
        <hr />
        <Converter />
      </div>
    </PreferencesContext.Provider>
  );
}

export default App;