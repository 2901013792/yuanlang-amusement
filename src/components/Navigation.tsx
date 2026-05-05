import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  visible: boolean;
}

const navLinks = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' },
  { name: '产品中心', path: '/products' },
  { name: '成功案例', path: '/cases' },
  { name: '营销服务', path: '/services' },
  { name: '新闻中心', path: '/news' },
  { name: '联系我们', path: '/contact' },
];

export default function Navigation({ visible }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="bg-white/95 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">圆</span>
                </div>
                <div>
                  <h1 className="text-xl font-black text-gray-900">圆郎游乐</h1>
                  <p className="text-xs text-gray-500">YUANLANG AMUSEMENT</p>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                      isActive(link.path)
                        ? 'bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white shadow-lg shadow-orange-300/50'
                        : 'text-gray-700 hover:text-[#FFA500] hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <button
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden bg-white/95 backdrop-blur-md border-t transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </>
  );
}