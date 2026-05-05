import { Link, useNavigate } from 'react-router-dom';

interface FooterProps {
  setCategory: (category: string) => void;
}

export default function Footer({ setCategory }: FooterProps) {
  const navigate = useNavigate();

  const handleProductCategory = (category: string) => {
    setCategory(category);
    navigate('/products');
  };

  const quickLinks = [
    { name: '首页', path: '/' },
    { name: '关于我们', path: '/about' },
    { name: '产品中心', path: '/products' },
    { name: '成功案例', path: '/cases' },
    { name: '营销服务', path: '/services' },
    { name: '新闻中心', path: '/news' },
    { name: '联系我们', path: '/contact' },
  ];

  const productCategories = [
    '淘气堡',
    '滑梯系列',
    '攀爬系列',
    '秋千系列',
    '摇摇乐',
    '户外拓展',
  ];

  const services = [
    { name: '场地规划', icon: '📐' },
    { name: '设计定制', icon: '🎨' },
    { name: '安装调试', icon: '🔧' },
    { name: '售后服务', icon: '🛠️' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">圆</span>
              </div>
              <div>
                <h3 className="text-xl font-black">圆郎游乐</h3>
                <p className="text-xs text-gray-400">YUANLANG AMUSEMENT</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              专业从事儿童游乐设备研发、设计、生产、销售于一体的综合性企业。我们致力于为孩子们创造安全、有趣、益智的游乐环境。
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FFA500] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FFA500] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FFA500] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">快速导航</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-[#FFA500] transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">产品分类</h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleProductCategory(category)}
                    className="text-gray-400 hover:text-[#FFA500] transition-colors text-sm text-left"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">服务支持</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name} className="flex items-center gap-2">
                  <span className="text-xl">{service.icon}</span>
                  <span className="text-gray-400 text-sm">{service.name}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4">联系方式</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-gray-400">
                  <span>📍</span> 广东省广州市番禺区石基镇永善村永峰路88号
                </p>
                <p className="flex items-center gap-2 text-gray-400">
                  <span>📞</span> 400-888-8888
                </p>
                <p className="flex items-center gap-2 text-gray-400">
                  <span>📧</span> contact@yuanlang.com
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 圆郎游乐设备有限公司 版权所有
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">使用条款</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">网站地图</a>
          </div>
        </div>
      </div>
    </footer>
  );
}