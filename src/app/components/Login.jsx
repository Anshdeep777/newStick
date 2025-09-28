"use client";
import Link from 'next/link'
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { Database, TrendingUp, Lightbulb, BarChart3, Shield, Zap, Brain } from "lucide-react";
import { RiGeminiFill } from "react-icons/ri";
import HowBar from "./components/HowBar";
import Accordion from "./components/Accordian";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      {/* Main content */}
      <div className="flex w-full">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-16 sm:py-24 bg-black">
          <div className="space-y-8 text-white">
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight tracking-tight drop-shadow-lg">
                Welcome
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light max-w-2xl leading-relaxed drop-shadow-md">
                Virtual trading made easy and safe
              </h2>
            </div>

            {/* CTA buttons */}
            <div className="pt-8 flex gap-4">
              <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 text-black px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 flex justify-center items-center gap-3 before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-400 before:via-emerald-400 before:to-green-400 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 before:animate-pulse">
                <span className="relative z-10 flex items-center gap-3">
                <Link href='/home'>
                Get Started
                </Link>

                  
                  <BsArrowUpRightCircleFill className="transform transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-full transform translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-green-400 text-white hover:bg-white hover:text-emerald-600">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-1/3 h-screen">
          <video
            src="/login.mp4"
            className="w-full h-full object-cover shadow-2xl"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>

          {/* Floating Icons with Ring Frames */}
          <div className="absolute top-8 left-8 group">
            <div className="relative rounded-2xl p-4 shadow-xl border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/25 hover:shadow-2xl">
              {/* Ring Frame */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/50 animate-ping"></div>
              <img
                src="/Icon1.png"
                className="relative w-12 h-12 object-contain filter drop-shadow-lg"
                alt="Trading Icon"
              />
            </div>
          </div>

          <div className="absolute top-1/2 right-8 -translate-y-1/2 group">
            <div className="relative rounded-full p-5 shadow-2xl border border-white/30 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-emerald-500/20">
              {/* Ring Frame */}
              <div className="absolute inset-0 rounded-full ring-4 ring-blue-400/40 animate-pulse"></div>
              <img
                src="/Icon2.png"
                className="relative w-14 h-14 object-contain filter drop-shadow-lg"
                alt="Analytics Icon"
              />
            </div>
          </div>

          <div className="absolute bottom-8 right-8 group">
            <div className="relative rounded-xl p-3 shadow-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-black/50">
              {/* Ring Frame */}
              <div className="absolute inset-0 rounded-xl ring-2 ring-amber-400/40 animate-ping"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-inner relative">
                <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Strip */}
      <div className="relative w-full h-24 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border border-gray-800/50 backdrop-blur-sm mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5"></div>
        <div className="relative flex items-center justify-between h-full px-8 lg:px-12">
          {/* Features */}
          {[
            {
              icon: Database,
              title: "Fast & Secure",
              subtitle: "Enterprise Grade",
              bg: "bg-emerald-500/10",
              border: "border-emerald-500/20",
              text: "text-emerald-400"
            },
            {
              icon: TrendingUp,
              title: "Graphical Analysis",
              subtitle: "Real-time Insights",
              bg: "bg-blue-500/10",
              border: "border-blue-500/20",
              text: "text-blue-400"
            },
            {
              icon: Lightbulb,
              title: "Smart Trading Tools",
              subtitle: "AI Powered",
              bg: "bg-amber-500/10",
              border: "border-amber-500/20",
              text: "text-amber-400"
            }
          ].map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div
                className={`p-2 rounded-lg ${feat.bg} ${feat.border} group-hover:bg-opacity-20 transition-all duration-300`}
              >
                <feat.icon className={`w-5 h-5 ${feat.text}`} />
              </div>
              <div className="flex flex-col text-white">
                <p className="text-sm font-semibold tracking-wide">{feat.title}</p>
                <p className="text-xs text-gray-400">{feat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent"></div>
      </div>

      {/* Modern Cards Section */}
      <div className="w-full min-h-screen bg-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Built for Your Needs
          </h1>
          <p className="text-gray-400 text-xl mb-16 max-w-2xl">
            Discover powerful features designed to elevate your trading experience with cutting-edge technology and intuitive design.
          </p>

          {/* Cards Grid */}
          <div className="flex flex-col justify-center items-center gap-8">
            {/* Top Row */}
            <div className="flex gap-8 w-full max-w-5xl">
              {/* Real-time Analytics Card */}
              <div className="group relative flex-1 h-[350px] bg-gradient-to-br from-gray-900/50 to-black border border-blue-200/30 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-[1.02]">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon with glow effect */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-8 h-8 text-blue-400" />
                      <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    Real-time Analytics
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1">
                    Advanced charting tools with live market data, technical indicators, and customizable dashboards for informed decision making.
                  </p>
                  
                  {/* Floating elements */}
                  <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-20 transition-opacity duration-300">
                    <BarChart3 className="w-20 h-20 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Security Shield Card */}
              <div className="group relative flex-1 h-[350px] bg-gradient-to-br from-gray-900/50 to-black border border-green-200/30 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-500 hover:transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-400"></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-8 h-8 text-emerald-400" />
                      <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                    Bank-Grade Security
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1">
                    Military-grade encryption, multi-factor authentication, and secure cold storage to protect your digital assets and personal data.
                  </p>
                  
                  <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-20 transition-opacity duration-300">
                    <Shield className="w-20 h-20 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex gap-8 w-full max-w-5xl">
              {/* Lightning Fast Execution Card */}
              <div className="group relative flex-1 h-[350px] bg-gradient-to-br from-gray-900/50 to-black border border-yellow-200/30 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-amber-500/30 transition-all duration-500 hover:transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-400"></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-8 h-8 text-amber-400" />
                      <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1">
                    Ultra-low latency execution with microsecond precision. Execute trades instantly with our optimized infrastructure and direct market access.
                  </p>
                  
                  <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-20 transition-opacity duration-300">
                    <Zap className="w-20 h-20 text-amber-400" />
                  </div>
                </div>
              </div>

              {/* AI-Powered Insights Card */}
              <div className="group relative flex-1 h-[350px] bg-gradient-to-br from-gray-900/50 to-black border border-purple-200/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-purple-500 transition-all duration-500 hover:transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <RiGeminiFill  className="w-8 h-8 text-purple-400" />
                      <div className="absolute inset-0 rounded-2xl bg-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    AI-Powered Insights
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1">
                    Machine learning algorithms analyze market patterns, predict trends, and provide personalized trading recommendations based on your portfolio.
                  </p>
                  
                  <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-20 transition-opacity duration-300">
                   <RiGeminiFill  className="w-20 h-20 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="flex flex-col">
            <h1 className="text-6xl font-bold text-center text-white mt-[100px]">How it works?</h1>
             <HowBar/>
             </div>
        {/* Accordian in black theme 4Faq */}
        <Accordion/>

        </div>
     
      </div>

      {/* Enhanced styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .group:hover {
          background-size: 400% 400%;
          animation: gradientShift 2s ease infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .group:hover .absolute.bottom-6.right-6 {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;