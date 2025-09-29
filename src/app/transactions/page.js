'use client';

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chart from "react-apexcharts";

const initialTransactions = [
  { id: 1, stock: "AAPL", shares: 10, price: 175, buyPrice: 160, change: "+2.4%" },
  { id: 2, stock: "TSLA", shares: 5, price: 780, buyPrice: 700, change: "+5.2%" },
  { id: 3, stock: "GOOGL", shares: 8, price: 145, buyPrice: 150, change: "-1.3%" },
];

const TransactionPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("transactions");

  // Portfolio calculations
  const totalValue = transactions.reduce((acc, t) => acc + t.shares * t.price, 0);
  const totalShares = transactions.reduce((acc, t) => acc + t.shares, 0);

  // Handlers
  const handleBuyMore = (id) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, shares: t.shares + 1 } : t)
    );
    const t = transactions.find(t => t.id === id);
    setHistory(prev => [{ ...t, action: "buy", date: new Date() }, ...prev]);
  };

  const handleSell = (id) => {
    const t = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    setHistory(prev => [{ ...t, action: "sell", date: new Date() }, ...prev]);
  };

  // Chart setup
  const chartOptions = {
    chart: {
    background: "#000", 
  },
    labels: transactions.map(t => t.stock),
    legend: { position: 'bottom', labels: { colors: '#ffffffff' } },
    theme: { mode: 'dark' }
  };
  const chartSeries = transactions.map(t => t.shares * t.price);

  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="flex-1 p-6">

        {/* Header */}
        <div className="backdrop-blur-xl bg-gray-900/40 rounded-2xl p-6 mb-6 border border-green-500/20">
          <h1 className="text-4xl font-bold mb-2 text-green-400">My Transactions</h1>
          <p className="text-gray-400 text-lg">Track and manage your portfolio</p>

          {/* Portfolio stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="backdrop-blur-md bg-gray-800/40 rounded-xl p-4 border border-green-500/20">
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-2xl font-bold text-green-400">${totalValue.toLocaleString()}</p>
            </div>
            <div className="backdrop-blur-md bg-gray-800/40 rounded-xl p-4 border border-green-500/20">
              <p className="text-gray-400 text-sm">Active Positions</p>
              <p className="text-2xl font-bold text-green-400">{transactions.length}</p>
            </div>
            <div className="backdrop-blur-md bg-gray-800/40 rounded-xl p-4 border border-green-500/20">
              <p className="text-gray-400 text-sm">Total Shares</p>
              <p className="text-2xl font-bold text-green-400">{totalShares}</p>
            </div>
          </div>
        </div>

        {/* Portfolio Chart */}
        {transactions.length > 0 && (
          <div className="rounded-2xl p-6 mb-6 border border-green-500/20 flex justify-center ">
            <div className="w-64 h-64">
              <h2 className="text-xl font-bold text-white mb-4 text-center">Portfolio Diversification</h2>
              <Chart options={chartOptions} series={chartSeries} type="pie" width={250} height={250} />
            </div>
          </div>
        )}

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.map((t) => {
            const percent = ((t.shares * t.price / totalValue) * 100).toFixed(1);
            const profitLoss = t.shares * (t.price - t.buyPrice);

            return (
              <div
                key={t.id}
                className="backdrop-blur-xl bg-gray-900/40 p-4 rounded-2xl border border-green-500/20 shadow-md flex justify-between items-center"
              >
                {/* Stock Info */}
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">{t.stock}</h2>
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-semibold
                        ${t.change.startsWith('+')
                          ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                          : 'bg-red-500/20 text-red-400 border border-red-400/30'}
                      `}
                    >
                      {t.change}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-2 text-sm">
                    <p className="text-green-400">Shares: {t.shares}</p>
                    <p className="text-gray-400">Price: ${t.price}</p>
                    <p className="text-emerald-400">Value: ${(t.shares*t.price).toLocaleString()}</p>
                    <p className={`${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>P/L: ${profitLoss.toLocaleString()}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBuyMore(t.id)}
                    className="px-4 py-2 rounded-xl font-semibold bg-green-600 hover:bg-green-500 transition"
                  >
                    Buy More
                  </button>
                  <button
                    onClick={() => handleSell(t.id)}
                    className="px-4 py-2 rounded-xl font-semibold bg-red-600 hover:bg-red-500 transition"
                  >
                    Sell
                  </button>
                </div>
              </div>
            );
          })}

          {/* Empty state */}
          {transactions.length === 0 && (
            <div className="text-center text-gray-400 p-20 border border-green-500/20 rounded-2xl">
              <p>No transactions available.</p>
              <button
                className="mt-4 px-4 py-2 bg-green-600 rounded-xl hover:bg-green-500"
                onClick={() => alert('Start trading now!')}
              >
                Start Trading
              </button>
            </div>
          )}
        </div>

        {/* Transaction History */}
        {history.length > 0 && (
          <div className="backdrop-blur-xl bg-gray-900/40 rounded-2xl p-6 mt-6 border border-green-500/20">
            <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((h, idx) => (
                <div key={idx} className="flex justify-between text-sm border-b border-gray-700 pb-1">
                  <span>{h.stock} - {h.action.toUpperCase()}</span>
                  <span>{h.shares} shares @ ${h.price}</span>
                  <span>{h.date.toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TransactionPage;
