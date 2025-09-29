"use client";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Bell,
  User,
  BarChart3,
  LayoutDashboard,
  LogOut,
  ArrowRightLeft,
  UserRoundCog,
} from "lucide-react";
import { RiGeminiFill } from "react-icons/ri";
import Chart from "react-apexcharts";
import NavButton from "../components/NavButton";
import AiPopup from "../components/AiPopup";
import Sidebar from "../components/Sidebar";

// Candlestick Chart Component

const CandleChart = ({ stockData }) => {
  const series = [
    {
      data: stockData.map((d, i) => ({
        x: `Day ${i + 1}`,
        y: [d.Open, d.High, d.Low, d.Close],
      })),
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      background: "#1a1a1a",
      toolbar: { show: false },
    },
    xaxis: {
      type: "category",
      labels: { style: { colors: "#cbd5e1" } },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: "#cbd5e1" } },
    },
    grid: { borderColor: "#333" },
  };

  return (
    <div className="w-full h-[350px] bg-gray-900 rounded-lg">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height="100%"
        width="100%"
      />
    </div>
  );
};




// Main Page
const Page = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const stockData = [
    { Open: 135.5, High: 140, Low: 134.8, Close: 138.2 },
    { Open: 138.2, High: 142, Low: 136, Close: 140 },
    { Open: 140, High: 145, Low: 138, Close: 143 },
    { Open: 143, High: 147, Low: 140, Close: 146 },
    { Open: 146, High: 150, Low: 145, Close: 149 },
  ];

  const latest = stockData[stockData.length - 1];
  const priceChange = latest.Close - latest.Open;
  const priceChangePercent = ((priceChange / latest.Open) * 100).toFixed(2);

  return (
    <div className="flex min-h-screen bg-black text-gray-200 overflow-x-hidden">
  <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

  <div className="flex-1 ml-20 flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 bg-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome User!</h1>
            <p className="text-gray-400 mt-1">
              Monitor and trade your favorite stocks
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 bg-black/90 border-l border-green-500 rounded-full px-6 py-4 shadow-lg hover:shadow-green-500/30 transition-all">
              {/* Wallet Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500/20">
                <img src="Wallet1.png" alt="Wallet" className="w-10 h-10" />
              </div>
              {/* Amount Text */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-green-400">$100</h1>
                <p className="text-sm text-gray-400">Available Balance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Top Section */}
          <div className="flex gap-6">
            {/* Candlestick Chart */}
            <div className="flex-1">
              <div className="bg-gray-950 rounded-2xl border border-gray-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">AAPL</h2>
                    <p className="text-gray-400">Apple Inc.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      ${latest.Close}
                    </div>
                    <div
                      className={`flex items-center gap-1 ${
                        priceChange >= 0 ? "text-green-400" : "text-red-500"
                      }`}
                    >
                      {priceChange >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-semibold">
                        ${Math.abs(priceChange).toFixed(2)} (
                        {priceChangePercent}%)
                      </span>
                    </div>
                  </div>
                </div>
                <CandleChart stockData={stockData} />
              </div>
            </div>

            {/* Stock Info Panel */}
            <div className="w-80">
              <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 h-[500px] flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Stock Details
                </h3>
                <div className="space-y-4 flex-1">
                  {["Open", "High", "Low", "Close"].map((key) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-3 bg-gray-800 rounded-lg"
                    >
                      <span className="text-gray-400 font-medium">{key}</span>
                      <span
                        className={`font-semibold ${
                          key === "High"
                            ? "text-green-400"
                            : key === "Low"
                            ? "text-red-500"
                            : "text-white"
                        }`}
                      >
                        ${latest[key]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto space-y-3">
                  <button className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                    Buy Stock
                  </button>
                  <button
                    className="w-full bg-gradient-to-r from-black via-gray-900 to-green-500 
             text-white font-semibold py-4 px-8 rounded-2xl 
             transition-all duration-300 ease-in-out transform hover:scale-105 
             shadow-lg hover:shadow-xl flex justify-center items-center gap-3 
             border border-white/30 hover:border-green-300/60"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    <RiGeminiFill className="text-xl" />
                    Ask me
                  </button>
                </div>
              </div>
            </div>
          </div>
          <AiPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
          {/* Bottom Section */}
          <div className="flex gap-6">
            {/* Search & Quick Access */}
            <div className="flex-1">
              <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 h-64">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Search Stocks
                </h3>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for stocks..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Apple",
                    "Tesla",
                    "Microsoft",
                    "Google",
                    "Amazon",
                    "Meta",
                  ].map((company) => (
                    <button
                      key={company}
                      className="px-4 py-2 bg-gray-800 hover:bg-green-50 hover:text-green-600 text-gray-300 rounded-lg transition-colors font-medium"
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Summary */}
            <div className="w-80">
              <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 h-64">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Market Overview
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "S&P 500",
                      value: "4,567.23",
                      change: "+1.2%",
                      up: true,
                    },
                    {
                      name: "NASDAQ",
                      value: "14,234.56",
                      change: "+0.8%",
                      up: true,
                    },
                    {
                      name: "Dow Jones",
                      value: "35,123.45",
                      change: "-0.3%",
                      up: false,
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-400">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">
                          {item.value}
                        </span>
                        <span
                          className={`${
                            item.up ? "text-green-400" : "text-red-500"
                          } text-sm flex items-center gap-1`}
                        >
                          {item.up ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
