'use client'
import { useState } from 'react';

const data = [
  { key: 1, Title: 'Apple', Symbol: 'AAPL', Open: 135.5, Close: 138.2, High: 140.0, Low: 134.8, Volume: '1.2M' },
  { key: 2, Title: 'Tata', Symbol: 'TATA', Open: 420.0, Close: 415.5, High: 430.0, Low: 412.0, Volume: '850K' },
  { key: 3, Title: 'Samsung', Symbol: 'SMSN', Open: 88.5, Close: 90.2, High: 91.0, Low: 87.8, Volume: '2.1M' },
  { key: 4, Title: 'Jio', Symbol: 'RJIO', Open: 450.0, Close: 448.0, High: 460.0, Low: 445.0, Volume: '1.5M' }
]

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TrendingDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
)

const CandlestickIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

// Simple Candlestick Chart Component
const CandlestickChart = ({ data: stockData }) => {
  const chartData = [
    { time: '09:30', open: stockData.Open, high: stockData.High, low: stockData.Low, close: stockData.Close },
    { time: '10:00', open: stockData.Close, high: stockData.High + 2, low: stockData.Low - 1, close: stockData.Close + 1.5 },
    { time: '10:30', open: stockData.Close + 1.5, high: stockData.High + 3, low: stockData.Low, close: stockData.Close + 2.2 },
    { time: '11:00', open: stockData.Close + 2.2, high: stockData.High + 4, low: stockData.Low + 1, close: stockData.Close + 1.8 },
    { time: '11:30', open: stockData.Close + 1.8, high: stockData.High + 2, low: stockData.Low + 0.5, close: stockData.Close + 2.5 },
    { time: '12:00', open: stockData.Close + 2.5, high: stockData.High + 5, low: stockData.Low + 2, close: stockData.Close + 3.1 },
  ];

  const maxPrice = Math.max(...chartData.map(d => d.high)) + 5;
  const minPrice = Math.min(...chartData.map(d => d.low)) - 5;
  const priceRange = maxPrice - minPrice;

  const getY = (price) => ((maxPrice - price) / priceRange) * 250 + 20;

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Price Chart</h3>
        <div className="text-sm text-gray-400">Last 6 hours</div>
      </div>
      
      <div className="relative">
        <svg width="100%" height="300" className="overflow-visible">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={20 + (i * 62.5)}
              x2="100%"
              y2={20 + (i * 62.5)}
              stroke="#374151"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}
          
          {/* Candlesticks */}
          {chartData.map((candle, i) => {
            const x = (i / (chartData.length - 1)) * 85 + 7.5;
            const isGreen = candle.close > candle.open;
            const bodyTop = getY(Math.max(candle.open, candle.close));
            const bodyBottom = getY(Math.min(candle.open, candle.close));
            const bodyHeight = Math.max(bodyBottom - bodyTop, 2);

            return (
              <g key={i}>
                {/* Wick */}
                <line
                  x1={`${x}%`}
                  y1={getY(candle.high)}
                  x2={`${x}%`}
                  y2={getY(candle.low)}
                  stroke={isGreen ? "#10B981" : "#EF4444"}
                  strokeWidth="1"
                />
                {/* Body */}
                <rect
                  x={`${x - 1.5}%`}
                  y={bodyTop}
                  width="3%"
                  height={bodyHeight}
                  fill={isGreen ? "#10B981" : "#EF4444"}
                  stroke={isGreen ? "#059669" : "#DC2626"}
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </svg>
        
        {/* Time labels */}
        <div className="flex justify-between mt-2 px-4">
          {chartData.map((candle, i) => (
            <span key={i} className="text-xs text-gray-400">{candle.time}</span>
          ))}
        </div>
      </div>
      
      {/* Price info */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <div className="text-xs text-gray-400">Open</div>
          <div className="text-white font-semibold">${stockData.Open}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">High</div>
          <div className="text-green-400 font-semibold">${stockData.High}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Low</div>
          <div className="text-red-400 font-semibold">${stockData.Low}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Close</div>
          <div className="text-white font-semibold">${stockData.Close}</div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [popupData, setPopupData] = useState(null);

  const openChart = (stockData) => {
    setPopupData(stockData);
  };

  const closeChart = () => {
    setPopupData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-black relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      <div className="relative z-10 py-12 px-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 mb-3">
              Market Pulse
            </h1>
            <p className="text-lg text-gray-400 font-light">Real-time market insights at your fingertips</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="text-emerald-400 text-sm font-medium">● Live</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.map((item) => {
            const isPositive = item.Close > item.Open;
            const changeAmount = item.Close - item.Open;
            const changePercent = ((changeAmount / item.Open) * 100).toFixed(2);

            return (
              <div
                key={item.key}
                className={`
                  group relative overflow-hidden backdrop-blur-xl rounded-3xl p-8 transition-all duration-500
                  border border ${isPositive ? 'border-blue-200/20 hover:border-emerald-500' : 'border-red-500/30 hover:border-red-500'}
                  bg-gradient-to-br ${isPositive ? 'from-green-900/30 via-gray-900/30 to-slate-800/50' : 'from-red-900/30 via-gray-900/30 to-slate-800/50'}
                  hover:shadow-2xl ${isPositive ? 'hover:shadow-emerald-500/10' : 'hover:shadow-red-500/10'}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">{item.Title.charAt(0)}</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border border-slate-900"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{item.Title}</h3>
                        <p className="text-gray-400 font-medium">{item.Symbol}</p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm ${
                      isPositive 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      {changePercent}%
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="text-5xl font-black text-white mb-2">${item.Close.toFixed(2)}</div>
                    <div className={`text-lg font-semibold flex items-center gap-2 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      <span>{isPositive ? '+' : ''}{changeAmount.toFixed(2)}</span>
                      <span className="text-gray-500">from open</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[ 
                      { label: 'Open', value: `$${item.Open}` },
                      { label: 'High', value: `$${item.High}` },
                      { label: 'Low', value: `$${item.Low}` },
                      { label: 'Volume', value: item.Volume }
                    ].map((metric, index) => (
                      <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
                        <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">{metric.label}</div>
                        <div className="text-white font-bold text-lg">{metric.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => openChart(item)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5"
                    >
                      <CandlestickIcon /> 
                      <span>View Analytics</span>
                    </button>

                    <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-0.5">
                      Add to Portfolio
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Popup Modal */}
      {popupData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 rounded-3xl p-8 w-full max-w-4xl mx-4 relative shadow-2xl border border-gray-700">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl font-bold transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700"
              onClick={closeChart}
            >
              ×
            </button>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">{popupData.Title} Analytics</h2>
              <p className="text-gray-400">{popupData.Symbol} • Real-time market data</p>
            </div>
            
            <CandlestickChart data={popupData} />
            
            <div className="flex gap-4 mt-6">
              <button 
                onClick={closeChart}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
              >
                Close
              </button>
              <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300">
                Export Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home