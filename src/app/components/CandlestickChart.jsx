'use client'

import React, { useRef, useEffect, useState } from 'react';

const CandlestickChart = ({ stockData }) => {
  const containerRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    if (containerRef.current) {
      setChartHeight(containerRef.current.clientHeight - 60); // leave space for labels
    }
    const handleResize = () => {
      if (containerRef.current) {
        setChartHeight(containerRef.current.clientHeight - 60);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const getY = (price) => ((maxPrice - price) / priceRange) * chartHeight + 20;

  return (
    <div ref={containerRef} className="w-full h-full bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-white">Price Chart</h3>
        <div className="text-sm text-gray-400">Last 6 hours</div>
      </div>

      {/* Chart */}
      <div className="flex-1 relative">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={20 + (i * (chartHeight / 4))}
              x2="100%"
              y2={20 + (i * (chartHeight / 4))}
              stroke="#374151"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* Candlesticks */}
          {chartData.map((candle, i) => {
            const x = (i / (chartData.length - 1)) * 95 + 2.5; // percentage
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
        <div className="flex justify-between mt-2 px-1">
          {chartData.map((candle, i) => (
            <span key={i} className="text-xs text-gray-400">{candle.time}</span>
          ))}
        </div>
      </div>

      {/* Price info */}
      <div className="grid grid-cols-4 gap-4 mt-4">
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

export default CandlestickChart;
