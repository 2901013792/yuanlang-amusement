export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
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
        
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-45"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-8">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg">
              🌟 10年专注 · 品质保证
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight">
            关于圆郎娱乐
            <span className="block text-3xl md:text-4xl font-bold mt-4 text-white/90">About Us</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-16 text-white/95 drop-shadow-lg max-w-3xl mx-auto font-light">
            10年专注儿童游乐设备制造，为孩子创造快乐童年
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl">
              <div className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:scale-125 transition-transform duration-300">2013</div>
              <div className="text-white/90 font-semibold text-sm md:text-base">成立年份</div>
              <div className="text-white/60 text-xs mt-2">专业制造经验</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl">
              <div className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:scale-125 transition-transform duration-300">1000+</div>
              <div className="text-white/90 font-semibold text-sm md:text-base">成功案例</div>
              <div className="text-white/60 text-xs mt-2">遍布全国</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl">
              <div className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:scale-125 transition-transform duration-300">50+</div>
              <div className="text-white/90 font-semibold text-sm md:text-base">出口国家</div>
              <div className="text-white/60 text-xs mt-2">全球销售</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:rotate-1 hover:shadow-2xl">
              <div className="text-5xl md:text-6xl font-black text-white mb-3 group-hover:scale-125 transition-transform duration-300">24h</div>
              <div className="text-white/90 font-semibold text-sm md:text-base">技术支持</div>
              <div className="text-white/60 text-xs mt-2">全天候服务</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-40 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] px-6 py-2 rounded-full text-white text-sm font-semibold shadow-lg">
                  📖 我们的故事
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-gray-900 tracking-tight">专业实力，值得信赖</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                圆郎娱乐设备有限公司成立于2013年，是一家专业从事游乐设备研发、设计、制造的企业。
                我们致力于为全球客户提供高品质、创新型的游乐解决方案。
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                经过10余年的发展，我们已成为行业领先品牌，产品遍布全国，
                服务超过1000个幼儿园、公园、商场。
              </p>
              <div className="flex gap-4">
                <div className="flex-1 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl p-6 text-white text-center shadow-xl">
                  <div className="text-4xl font-bold mb-1">2013</div>
                  <div className="text-sm opacity-90">成立年份</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-[#FF8C00] to-[#FF6B35] rounded-2xl p-6 text-white text-center shadow-xl">
                  <div className="text-4xl font-bold mb-1">1000+</div>
                  <div className="text-sm opacity-90">成功案例</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-[0_15px_40px_rgba(255,165,0,0.15)] transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🌍</div>
                <div className="font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">出口国家</div>
              </div>
              <div className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-[0_15px_40px_rgba(255,165,0,0.15)] transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">👨‍🔧</div>
                <div className="font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">专业团队</div>
              </div>
              <div className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-[0_15px_40px_rgba(255,165,0,0.15)] transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✅</div>
                <div className="font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">安全认证</div>
              </div>
              <div className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-[0_15px_40px_rgba(255,165,0,0.15)] transition-all duration-300 hover:-translate-y-2">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔧</div>
                <div className="font-bold text-gray-900">24h</div>
                <div className="text-sm text-gray-600">技术支持</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] px-8 py-3 rounded-full text-white text-sm font-semibold shadow-lg">
                ✨ 核心优势
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">我们的优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">专业实力，值得信赖</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="group bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">行业认证</h3>
              <p className="text-gray-600">ISO9001、CE、TUV认证</p>
            </div>
            <div className="group bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">👨‍🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">专业团队</h3>
              <p className="text-gray-600">500+专业技术人员</p>
            </div>
            <div className="group bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">快速交付</h3>
              <p className="text-gray-600">7-15天快速交付</p>
            </div>
            <div className="group bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">品质保证</h3>
              <p className="text-gray-600">3年质保，终身维护</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}