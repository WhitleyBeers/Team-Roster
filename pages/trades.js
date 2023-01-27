/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllTrades } from '../api/tradeData';
import TradeCards from '../components/Cards/TradeCards';
import { useAuth } from '../utils/context/authContext';

export default function TradeRequests() {
  const [trades, setTrades] = useState([]);
  const { user } = useAuth();

  const displayTrades = () => {
    getAllTrades(user.uid).then(setTrades);
  };

  useEffect(() => {
    displayTrades();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>Trade Requests</h1>
      {trades.length >= 1
        ? trades.map((trade) => (
          <TradeCards key={trade.firebaseKey} tradeObj={trade} onUpdate={displayTrades} />
        ))
        : (<h5>No active trades</h5>)}
    </div>
  );
}
