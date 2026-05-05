import { useState, useEffect } from 'react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  setCategory?: (category: string) => void;
}

export default function HomePage({ onNavigate, setCategory }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/products/wooden/animal/21.webp',
      title: '创造无限欢乐体验',
      subtitle: '专业儿童游乐设备制造商',
      desc: '从设计到安装，提供幼儿园/公园/商场一站式解决方案'
    },
    {
      image: '/products/wooden/unique/25.webp',
      title: '高端定制服务',
      subtitle: '按实际场地设计报价',
      desc: '独一无二的主题乐园，满足您的所有想象'
    },
    {
      image: '/products/expansion/climbing/6.webp',
      title: '安全环保材质',
      subtitle: '通过国家安全认证',
      desc: '采用优质黄花梨木，让孩子玩得开心，家长放心'
    },
    {
      image: '/products/wooden/pirate-ship/39.webp',
      title: '1000+ 成功案例',
      subtitle: '遍布全国 50+ 城市',
      desc: '服务超过 1000 个幼儿园、公园、商场'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleProductClick = (category: string) => {
    if (setCategory) {
      setCategory(category);
    }
    onNavigate('products');
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="absolute inset-0 overflow-hidden" style={{ height: '750px' }}>
          {Array.from({ length: 60 }, (_, i) => {
            const size = Math.random() * 10 + 3;
            const left = Math.random() * 100;
            const bottom = Math.random() * 100;
            const delay = -Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.3;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  bottom: `${bottom}%`,
                  opacity: opacity,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
                  animation: `rise ${duration}s infinite ease-in`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
        </div>
        
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-45"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-8">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg">
              ✨ 专业儿童游乐设备制造商
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight">
            {slides[currentSlide].title}
            <span className="block text-3xl md:text-4xl font-bold mt-4 text-white/90">{slides[currentSlide].subtitle}</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-white/95 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed">
            {slides[currentSlide].desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => onNavigate('products')}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,165,0,0.4)] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                🎢 探索产品
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="group px-10 py-5 bg-white/15 backdrop-blur-md text-white rounded-full font-bold text-xl border-2 border-white/40 hover:bg-white/25 hover:border-white/60 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              💬 免费咨询
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all hover:bg-white/30"
        >
          <span className="text-3xl">‹</span>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all hover:bg-white/30"
        >
          <span className="text-3xl">›</span>
        </button>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-40 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] px-8 py-3 rounded-full text-white text-sm font-semibold shadow-lg">
                ✨ 为什么选择我们
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">专业实力，品质保证</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">20年行业经验，为客户提供一站式游乐解决方案</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl shadow-2xl p-8 hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🎨
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FFA500] transition-colors">创新设计</h3>
              <p className="text-gray-600 leading-relaxed">20年行业经验，融合国际前沿设计理念，打造独特游乐体验</p>
            </div>
            <div className="group bg-white rounded-3xl shadow-2xl p-8 hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FFA500] transition-colors">安全认证</h3>
              <p className="text-gray-600 leading-relaxed">通过ISO、CE、TUV等国际权威认证，品质可靠，安全无忧</p>
            </div>
            <div className="group bg-white rounded-3xl shadow-2xl p-8 hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🌍
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#FFA500] transition-colors">全球服务</h3>
              <p className="text-gray-600 leading-relaxed">产品出口50+国家，提供全方位安装、培训与维护支持</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] px-8 py-3 rounded-full text-white text-sm font-semibold shadow-lg">
                🎢 热门产品
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">精选爆款，市场验证</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">100+款游乐设备，满足各种场景需求</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 cursor-pointer"
              onClick={() => handleProductClick('木制系列')}
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img 
                  src="/products/wooden/animal/21.webp" 
                  alt="木制系列" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-[#FFA500]/10 text-[#FF8C00] px-3 py-1 rounded-full font-medium">主打系列</span>
                  <span className="text-xs bg-[#FFA500]/10 text-[#FF8C00] px-3 py-1 rounded-full font-medium">定制</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">木制系列</h3>
                <p className="text-gray-600 mb-6">动物篇/海盗船/奇艺篇，黄花梨木材质，安全环保</p>
                <div className="flex items-center gap-2 text-[#FF8C00] font-semibold">
                  查看详情
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </div>
              </div>
            </div>
            <div 
              className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 cursor-pointer"
              onClick={() => handleProductClick('非标系列')}
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img 
                  src="/products/wooden/unique/25.webp" 
                  alt="非标定制" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-[#FFA500]/10 text-[#FF8C00] px-3 py-1 rounded-full font-medium">高端定制</span>
                  <span className="text-xs bg-[#FFA500]/10 text-[#FF8C00] px-3 py-1 rounded-full font-medium">爆款</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">非标定制</h3>
                <p className="text-gray-600 mb-6">按实际场地设计报价，独一无二主题乐园</p>
                <div className="flex items-center gap-2 text-[#FF8C00] font-semibold">
                  查看详情
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </div>
              </div>
            </div>
            <div 
              className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 cursor-pointer"
              onClick={() => handleProductClick('拓展系列')}
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img 
                  src="/products/expansion/climbing/6.webp" 
                  alt="拓展系列" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-[#FFA500]/10 text-[#FF8C00] px-3 py-1 rounded-full font-medium">学校</span>
                  <span className="text-xs bg-[#FFA500]/10 text-[#FF8C00] px-3 py-1 rounded-full font-medium">公园</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">拓展系列</h3>
                <p className="text-gray-600 mb-6">攀爬/爬网/钻网/廊架，体能训练好帮手</p>
                <div className="flex items-center gap-2 text-[#FF8C00] font-semibold">
                  查看详情
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <button 
              onClick={() => onNavigate('products')}
              className="group px-12 py-5 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,165,0,0.4)] transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                查看全部产品
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 60 }, (_, i) => {
            const size = Math.random() * 10 + 3;
            const left = Math.random() * 100;
            const bottom = Math.random() * 100;
            const delay = -Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.3;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  bottom: `${bottom}%`,
                  opacity: opacity,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
                  animation: `rise ${duration}s infinite ease-in`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white drop-shadow-2xl tracking-tight">准备好开启合作了吗？</h2>
          <p className="text-2xl md:text-3xl text-white/95 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            告诉我们您的需求，专业团队将在24小时内为您提供定制化方案
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="group px-14 py-6 bg-white text-[#FFA500] rounded-full font-black text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300"
          >
            📞 立即咨询
            <span className="ml-3 group-hover:translate-x-2 transition-transform inline-block">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}