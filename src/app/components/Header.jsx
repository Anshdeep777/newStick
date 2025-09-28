const Header = () => {
  return (
    <header className="fixed top-0 left-[90px] right-0 h-16 bg-black border-b border-green-400 
        rounded-bl-2xl shadow-[0_2px_10px_rgba(34,197,94,0.3)] z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">My App</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">Trading</a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">Portfolio</a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">Markets</a>
            <a href="#" className="text-gray-200 hover:text-white transition-colors duration-200">About</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-200 hover:text-white transition-colors duration-200">Sign In</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-400 transition-colors duration-200 shadow-green">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
