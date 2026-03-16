﻿import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      // 导航栏固定显示，不需要变色
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderPage = () => {
    if (selectedProduct) {
      return <ProductDetailPage product={selectedProduct} onBack={() => setSelectedProduct(null)} />
    }
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />
      case 'about': return <AboutPage />
      case 'products': return <ProductsPage setSelectedProduct={setSelectedProduct} />
      case 'cases': return <CasesPage />
      case 'services': return <ServicesPage />
      case 'news': return <NewsPage />
      case 'contact': return <ContactPage />
      default: return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {renderPage()}
      <Footer />
    </div>
  )
}

function Navigation({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }: any) {
  const navLinks = [
    { id: 'home', label: '首页' },
    { id: 'about', label: '关于我们' },
    { id: 'products', label: '产品信息' },
    { id: 'cases', label: '成功案例' },
    { id: 'services', label: '营销服务' },
    { id: 'news', label: '新闻中心' },
    { id: 'contact', label: '联系我们' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpg" alt="圆郎游乐" className="w-12 h-12 object-contain rounded-xl shadow-lg bg-white" />
            <h1 className="text-2xl font-bold text-secondary">圆郎游乐</h1>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  currentPage === link.id
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-700"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id)
                  setMobileMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium ${
                  currentPage === link.id
                    ? 'bg-orange-50 text-primary'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

function HomePage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: '/products/1.jpg',
      title: '创造无限欢乐体验',
      subtitle: '专业儿童游乐设备制造商',
      desc: '从设计到安装，提供幼儿园/公园/商场一站式解决方案'
    },
    {
      image: '/products/10.jpg',
      title: '高端定制服务',
      subtitle: '按实际场地设计报价',
      desc: '独一无二的主题乐园，满足您的所有想象'
    },
    {
      image: '/products/20.jpg',
      title: '安全环保材质',
      subtitle: '通过国家安全认证',
      desc: '采用优质黄花梨木，让孩子玩得开心，家长放心'
    },
    {
      image: '/products/5.jpg',
      title: '1000+ 成功案例',
      subtitle: '遍布全国 50+ 城市',
      desc: '服务超过 1000 个幼儿园、公园、商场'
    }
  ]

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {/* Hero Section - 轮播图 */}
      <section className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <p className="text-lg md:text-xl mb-4 opacity-90">{slide.subtitle}</p>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-10 opacity-90">{slide.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setCurrentPage('products')}
                    className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg"
                  >
                    探索产品
                  </button>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all"
                  >
                    免费咨询
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* 轮播控制按钮 */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all"
        >
          <span className="text-2xl">‹</span>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all"
        >
          <span className="text-2xl">›</span>
        </button>
        
        {/* 轮播指示器 */}
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

      {/* 特色服务 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">为什么选择我们</h2>
            <p className="text-xl text-gray-600">专业实力，品质保证</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎨"
              title="创新设计"
              description="20 年行业经验，融合国际前沿设计理念，打造独特游乐体验"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon="🛡️"
              title="安全认证"
              description="通过 ISO、CE、TUV 等国际权威认证，品质可靠，安全无忧"
              color="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon="🌍"
              title="全球服务"
              description="产品出口 50+ 国家，提供全方位安装、培训与维护支持"
              color="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* 产品展示 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">热门产品</h2>
            <p className="text-xl text-gray-600">精选爆款，市场验证</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard
              name="木制系列"
              image="/products/1.jpg"
              description="动物篇/海盗船/奇艺篇，黄花梨木材质，安全环保"
              tags={['主打系列', '定制']}
              isImage={true}
            />
            <ProductCard
              name="非标定制"
              image="/products/10.jpg"
              description="按实际场地设计报价，独一无二主题乐园"
              tags={['高端定制', '爆款']}
              isImage={true}
            />
            <ProductCard
              name="拓展系列"
              image="/products/20.jpg"
              description="攀爬/爬网/钻网/廊架，体能训练好帮手"
              tags={['学校', '公园']}
              isImage={true}
            />
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('products')}
              className="bg-secondary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              查看全部产品 →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">准备好开启合作了吗？</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            告诉我们您的需求，专业团队将在 24 小时内为您提供定制化方案
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-secondary px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            立即咨询
          </button>
        </div>
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-secondary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">关于圆郎游乐</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            10 年专注儿童游乐设备制造，为孩子创造快乐童年
          </p>
        </div>
      </section>

      {/* 故事 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-secondary mb-6">我们的故事</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                圆郎游乐设备有限公司成立于 2013 年，是一家专业从事游乐设备研发、设计、制造的企业。
                我们致力于为全球客户提供高品质、创新型的游乐解决方案。
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                经过 10 余年的发展，我们已成为行业领先品牌，产品遍布全国，
                服务超过 1000 个幼儿园、公园、商场。
              </p>
              <div className="flex gap-4">
                <div className="flex-1 bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white text-center">
                  <div className="text-4xl font-bold mb-1">2005</div>
                  <div className="text-sm opacity-90">成立年份</div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-secondary to-blue-600 rounded-2xl p-6 text-white text-center">
                  <div className="text-4xl font-bold mb-1">1000+</div>
                  <div className="text-sm opacity-90">成功案例</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard number="50+" label="出口国家" color="from-orange-400 to-red-500" />
              <StatCard number="500+" label="专业团队" color="from-blue-400 to-cyan-500" />
              <StatCard number="100%" label="安全认证" color="from-green-400 to-emerald-500" />
              <StatCard number="24h" label="技术支持" color="from-purple-400 to-pink-500" />
            </div>
          </div>
        </div>
      </section>

      {/* 优势 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">我们的优势</h2>
            <p className="text-xl text-gray-600">专业实力，值得信赖</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <AdvantageCard icon="🏆" title="行业认证" desc="ISO9001、CE、TUV 认证" />
            <AdvantageCard icon="👨‍🔧" title="专业团队" desc="200+ 工程师和技术人员" />
            <AdvantageCard icon="🔬" title="创新研发" desc="年投入营收 8% 用于研发" />
            <AdvantageCard icon="🤝" title="贴心服务" desc="7×24 小时技术支持" />
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductsPage({ setSelectedProduct }: { setSelectedProduct: (product: any) => void }) {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  
  const products = [
    { name: '木制系列 - 动物篇', icon: '/products/2.jpg', category: '木制系列', desc: '兔子/青蛙/猫头鹰主题，黄花梨木材质，25-69 万', hot: true, isImage: true, price: '25-69 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - 海盗船', icon: '/products/5.jpg', category: '木制系列', desc: '大型海盗船主题，36-125 万，公园爆款', hot: true, isImage: true, price: '36-125 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - 奇艺篇', icon: '/products/8.jpg', category: '木制系列', desc: '植物大战僵尸/魔法屋主题，42-87 万', hot: true, isImage: true, price: '42-87 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '非标定制系列', icon: '/products/10.jpg', category: '非标系列', desc: '按实际场地设计报价，独一无二', hot: true, isImage: true, price: '面议', material: '定制', size: '定制', age: '全年龄段' },
    { name: '拓展系列 - 攀爬篇', icon: '/products/20.jpg', category: '拓展系列', desc: '攀岩墙/攀爬架，3.68 万起', hot: false, isImage: true, price: '3.68 万起', material: '镀锌管/绳网', size: '可定制', age: '6-15 岁' },
    { name: '拓展系列 - 爬网篇', icon: '/products/25.jpg', category: '拓展系列', desc: '绳网攀爬/钻网，适合公园学校', hot: false, isImage: true, price: '面议', material: '绳网', size: '可定制', age: '6-15 岁' },
    { name: '配套系列 - 秋千篇', icon: '/products/30.jpg', category: '配套系列', desc: '多种秋千组合，镀锌管/黄花梨木', hot: false, isImage: true, price: '面议', material: '镀锌管/黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '配套系列 - 戏水篇', icon: '/products/35.jpg', category: '配套系列', desc: '304 不锈钢戏水设备', hot: false, isImage: true, price: '面议', material: '304 不锈钢', size: '可定制', age: '全年龄段' },
    { name: '配套系列 - 体能篇', icon: '/products/40.jpg', category: '配套系列', desc: '平衡木/攀爬架/钻洞，黄花梨木', hot: false, isImage: true, price: '面议', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
  ]

  const categories = ['全部', '木制系列', '非标系列', '拓展系列', '配套系列']
  
  const filteredProducts = selectedCategory === '全部' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">产品中心</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            100+ 款游乐设备，满足各种场景需求
          </p>
        </div>
      </section>

      {/* 产品列表 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => {
              const count = cat === '全部' 
                ? products.length 
                : products.filter(p => p.category === cat).length
              return (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-secondary text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === cat
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedProduct(product)}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-56 bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                  {product.isImage ? (
                    <img src={product.icon} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <span className="text-8xl transform group-hover:scale-110 transition-transform duration-300">{product.icon}</span>
                  )}
                  {product.hot && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      🔥 热门
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary font-semibold bg-orange-50 px-3 py-1 rounded-full">{product.category}</span>
                  <h3 className="text-2xl font-bold text-secondary mt-3 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.desc}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProduct(product)
                    }}
                    className="text-primary font-semibold hover:text-orange-600 flex items-center gap-2 group/btn"
                  >
                    了解详情 
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ServicesPage() {
  const services = [
    { number: '01', icon: '💬', title: '需求咨询', desc: '专业顾问团队，根据您的场地、预算、目标客群提供定制化方案建议' },
    { number: '02', icon: '📐', title: '方案设计', desc: '3D 效果图呈现，多轮沟通优化，确保方案完美契合您的需求' },
    { number: '03', icon: '🏭', title: '生产制造', desc: '现代化生产基地，严格质量管控，按期交付高品质设备' },
    { number: '04', icon: '🔧', title: '安装指导', desc: '派遣专业工程师现场指导安装，或提供详细安装视频和文档' },
    { number: '05', icon: '🛠️', title: '售后维护', desc: '质保期内免费维护，终身技术支持，配件快速供应' },
  ]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">服务支持</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            从咨询到售后，全程陪伴
          </p>
        </div>
      </section>

      {/* 服务流程 */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-12">
            {services.map((service) => (
              <div key={service.number} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary to-accent text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                  {service.number}
                </div>
                <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{service.icon}</span>
                    <h3 className="text-2xl font-bold text-secondary">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">需要定制方案？</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              告诉我们您的需求，24 小时内为您提供专业方案
            </p>
            <button className="bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
              立即咨询
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">联系我们</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            期待与您合作，共创美好未来
          </p>
        </div>
      </section>

      {/* 联系内容 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 表单 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-secondary mb-6">发送消息</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">姓名</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="您的姓名" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">邮箱</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">电话</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="您的联系电话" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">留言</label>
                  <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="请描述您的需求..."></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                  提交留言
                </button>
              </form>
            </div>

            {/* 联系信息 */}
            <div className="space-y-6">
              <ContactInfoCard
                icon="📍"
                title="公司地址"
                content="浙江省温州市永嘉县桥下镇小京工业区"
                color="from-blue-500 to-cyan-500"
              />
              <ContactInfoCard
                icon="📞"
                title="联系电话"
                content="+86 400-XXX-XXXX"
                color="from-green-500 to-emerald-500"
              />
              <ContactInfoCard
                icon="📧"
                title="电子邮箱"
                content="info@yuanlang-amusement.com"
                color="from-orange-500 to-red-500"
              />
              <ContactInfoCard
                icon="🕐"
                title="工作时间"
                content="周一至周五 9:00-18:00"
                color="from-purple-500 to-pink-500"
              />
              
              {/* 社交媒体 */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">关注我们</h3>
                <div className="flex gap-4">
                  {['💬', '', '🎵', '📸'].map((emoji, i) => (
                    <button key={i} className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl hover:bg-primary hover:text-white transition-all">
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.jpg" alt="圆郎游乐" className="w-10 h-10 object-contain rounded-xl shadow-lg bg-white" />
              <h3 className="text-xl font-bold">圆郎游乐</h3>
            </div>
            <p className="text-white/80 leading-relaxed">专业游乐设备制造商，创造无限欢乐</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">快速链接</h4>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-primary cursor-pointer transition-colors">关于我们</li>
              <li className="hover:text-primary cursor-pointer transition-colors">产品中心</li>
              <li className="hover:text-primary cursor-pointer transition-colors">服务支持</li>
              <li className="hover:text-primary cursor-pointer transition-colors">联系方式</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">产品分类</h4>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-primary cursor-pointer transition-colors">木制系列</li>
              <li className="hover:text-primary cursor-pointer transition-colors">非标系列</li>
              <li className="hover:text-primary cursor-pointer transition-colors">水上乐园</li>
              <li className="hover:text-primary cursor-pointer transition-colors">主题定制</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">联系我们</h4>
            <ul className="space-y-2 text-white/80">
              <li>📞 400-XXX-XXXX</li>
              <li>📧 info@yuanlang-amusement.com</li>
              <li>📍 浙江省温州市永嘉县桥下镇小京工业区</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>&copy; 2026 圆郎游乐设备有限公司。All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function FeatureCard({ icon, title, description, color }: any) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

function ProductCard({ name, image, description, tags, isImage }: any) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="h-56 bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
        {isImage ? (
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <span className="text-8xl">{image}</span>
        )}
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          {tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs bg-orange-50 text-primary px-3 py-1 rounded-full font-medium">{tag}</span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-secondary mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

function StatCard({ number, label, color }: any) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white text-center`}>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  )
}

function AdvantageCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}

function ContactInfoCard({ icon, title, content, color }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-5 hover:shadow-2xl transition-shadow">
      <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-secondary">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  )
}

function ProductDetailPage({ product, onBack }: { product: any, onBack: () => void }) {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <span>←</span> 返回列表
          </button>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{product.name}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{product.desc}</p>
        </div>
      </section>

      {/* 产品详情 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 产品图片 */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img src={product.icon} alt={product.name} className="w-full h-96 object-cover" />
            </div>

            {/* 产品信息 */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm text-primary font-semibold bg-orange-50 px-4 py-2 rounded-full">{product.category}</span>
                  {product.hot && (
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">🔥 热门</span>
                  )}
                </div>

                <h2 className="text-3xl font-bold text-secondary mb-4">{product.name}</h2>
                <p className="text-gray-600 text-lg mb-6">{product.desc}</p>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">价格范围</span>
                    <span className="font-bold text-primary text-lg">{product.price}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">材质</span>
                    <span className="font-semibold text-secondary">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">尺寸</span>
                    <span className="font-semibold text-secondary">{product.size}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">适用年龄</span>
                    <span className="font-semibold text-secondary">{product.age}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                    立即咨询
                  </button>
                  <button className="w-full bg-white border-2 border-primary text-primary py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all">
                    获取报价
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品特色 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">产品特色</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-secondary mb-3">安全环保</h3>
              <p className="text-gray-600">采用环保材料，通过国家安全认证，让孩子玩得开心，家长放心</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-secondary mb-3">创新设计</h3>
              <p className="text-gray-600">国际前沿设计理念，色彩鲜艳，造型独特，吸引孩子注意力</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-secondary mb-3">耐用结实</h3>
              <p className="text-gray-600">优质材料制造，结构稳固，经久耐用，降低维护成本</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


function CasesPage() {
  const cases = [
    { title: '某市第一幼儿园', location: '浙江省温州市', image: '/products/1.jpg', desc: '大型木制淘气堡组合，面积 300㎡，2024 年 3 月完工', tags: ['幼儿园', '木制系列'] },
    { title: 'XX 房地产售楼部', location: '江苏省南京市', image: '/products/10.jpg', desc: '高端定制儿童游乐区，提升楼盘品质，2024 年 1 月完工', tags: ['房地产', '非标定制'] },
    { title: '某国际幼儿园', location: '上海市', image: '/products/20.jpg', desc: '户外拓展攀爬组合，面积 500㎡，2023 年 12 月完工', tags: ['幼儿园', '拓展系列'] },
    { title: 'XX 商场儿童乐园', location: '浙江省杭州市', image: '/products/5.jpg', desc: '室内海盗船主题乐园，面积 800㎡，2023 年 10 月完工', tags: ['商场', '木制系列'] },
    { title: '某公园无动力乐园', location: '福建省厦门市', image: '/products/25.jpg', desc: '大型户外无动力游乐设施，面积 2000㎡，2023 年 8 月完工', tags: ['公园', '拓展系列'] },
    { title: 'XX 度假村亲子乐园', location: '海南省三亚市', image: '/products/30.jpg', desc: '亲子互动游乐设施，面积 1500㎡，2023 年 5 月完工', tags: ['度假村', '配套系列'] },
  ]

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-gradient-to-br from-secondary to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">成功案例</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">1000+ 成功案例，遍布全国 50+ 城市</p>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-orange-50 text-primary px-3 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm"><span>📍</span><span>{item.location}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function NewsPage() {
  const news = [
    { title: '圆郎游乐参加 2024 年广州幼教展', date: '2024-03-15', category: '公司新闻', excerpt: '3 月 15 日，圆郎游乐携最新产品亮相广州国际幼教展，吸引众多客户参观咨询...' },
    { title: '新产品上市：海盗船系列全新升级', date: '2024-02-20', category: '产品动态', excerpt: '经过 6 个月研发，海盗船系列全新升级，采用更环保的黄花梨木材质...' },
    { title: '圆郎游乐通过 ISO9001 质量认证', date: '2024-01-10', category: '公司荣誉', excerpt: '近日，圆郎游乐正式通过 ISO9001 质量管理体系认证...' },
    { title: '行业资讯：2024 年儿童游乐设备市场趋势', date: '2024-01-05', category: '行业资讯', excerpt: '随着消费升级，家长对儿童游乐设备的品质要求越来越高...' },
  ]

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">新闻中心</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">了解圆郎游乐最新动态</p>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-6">
            {news.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm bg-orange-50 text-primary px-3 py-1 rounded-full font-medium">{item.category}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-secondary mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.excerpt}</p>
                  </div>
                  <div className="text-primary text-2xl">›</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default App
