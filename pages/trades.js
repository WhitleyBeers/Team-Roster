/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
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
      <Head>
        <title>Trade Requests</title>
      </Head>
      <h1>Trade Requests</h1>
      <hr />
      {trades.length >= 1 ? trades.map((trade) => <TradeCards key={trade.firebaseKey} tradeObj={trade} onUpdate={displayTrades} />) : <h3>No active trades</h3>}
    </div>
  );
}
