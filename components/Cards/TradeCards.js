import React, { useEffect, useState } from 'react';
import { getAllTrades } from '../../api/tradeData';
import { useAuth } from '../../utils/context/authContext';

export default function TradeCards() {
  const { user } = useAuth();
  const [trades, setTrades] = useState([]);
  const viewTrades = () => {
    getAllTrades(user.uid).then(setTrades);
  };

  useEffect(() => {
    viewTrades();
  }, []);

  return (
    <div>
      <p>TradeCards</p>
      <p>{trades}</p>
    </div>
  );
}
