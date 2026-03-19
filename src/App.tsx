﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [navVisible, setNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 向下滚动，隐藏导航栏
        setNavVisible(false)
      } else {
        // 向上滚动，显示导航栏
        setNavVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const openImageModal = (images: string[], index: number = 0) => {
    setCurrentImages(images)
    setCurrentImageIndex(index)
    setSelectedImage(images[index])
    setImageModalOpen(true)
  }

  const renderPage = () => {
    if (selectedProduct) {
      return <ProductDetailPage product={selectedProduct} onBack={() => {
        setSelectedProduct(null)
        setTimeout(() => {
          window.scrollTo(0, scrollPosition)
        }, 0)
      }} openImageModal={openImageModal} />
    }
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} setSelectedCategory={setSelectedCategory} />
      case 'about': return <AboutPage />
      case 'products': return <ProductsPage setSelectedProduct={setSelectedProduct} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} setScrollPosition={setScrollPosition} />
      case 'cases': return <CasesPage />
      case 'services': return <ServicesPage />
      case 'news': return <NewsPage />
      case 'contact': return <ContactPage />
      default: return <HomePage setCurrentPage={setCurrentPage} setSelectedCategory={setSelectedCategory} />
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        visible={navVisible}
      />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} setSelectedCategory={setSelectedCategory} />
      
      {/* 图片放大 Modal */}
        {imageModalOpen && (
          <div 
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setImageModalOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 transition-colors"
              onClick={() => setImageModalOpen(false)}
            >
              ×
            </button>
            {currentImages.length > 1 && (
              <>
                <button 
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    const newIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length
                    setCurrentImageIndex(newIndex)
                    setSelectedImage(currentImages[newIndex])
                  }}
                >
                  ‹
                </button>
                <button 
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    const newIndex = (currentImageIndex + 1) % currentImages.length
                    setCurrentImageIndex(newIndex)
                    setSelectedImage(currentImages[newIndex])
                  }}
                >
                  ›
                </button>
              </>
            )}
            <img 
              src={selectedImage} 
              alt="放大查看" 
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {currentImages.length > 1 && (
              <p className="absolute bottom-6 text-white/80 text-sm">
                {currentImageIndex + 1} / {currentImages.length}
              </p>
            )}
            <p className="absolute bottom-6 text-white/80 text-sm">
              点击任意处关闭 ×
            </p>
          </div>
        )}
    </div>
  )
}

function Navigation({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen, visible }: any) {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-transform duration-300 ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpg" alt="圆郎娱乐" className="w-12 h-12 object-contain rounded-xl shadow-lg bg-white/90" />
            <h1 className="text-2xl font-bold text-white">圆郎娱乐</h1>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  currentPage === link.id
                    ? 'bg-white text-primary'
                    : 'text-white hover:bg-white/20'
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

function HomePage({ setCurrentPage, setSelectedCategory }: { setCurrentPage: (page: string) => void, setSelectedCategory?: (category: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: '/products/wooden/animal/21.jpg',
      title: '创造无限欢乐体验',
      subtitle: '专业儿童游乐设备制造商',
      desc: '从设计到安装，提供幼儿园/公园/商场一站式解决方案'
    },
    {
      image: '/products/wooden/unique/25.jpg',
      title: '高端定制服务',
      subtitle: '按实际场地设计报价',
      desc: '独一无二的主题乐园，满足您的所有想象'
    },
    {
      image: '/products/expansion/climbing/6.jpg',
      title: '安全环保材质',
      subtitle: '通过国家安全认证',
      desc: '采用优质黄花梨木，让孩子玩得开心，家长放心'
    },
    {
      image: '/products/wooden/pirate-ship/39.jpg',
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
      {/* Hero Section - 美化版 */}
      <section className="relative py-32 overflow-hidden">
        {/* 多层渐变背景 */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        {/* 装饰性光晕 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* 粒子效果 */}
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
        
        {/* 装饰线条 */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-45"></div>
        
        {/* 内容 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* 标签 */}
          <div className="inline-block mb-8">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg">
              ✨ 专业儿童游乐设备制造商
            </div>
          </div>
          
          {/* 标题 */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight">
            {slides[currentSlide].title}
            <span className="block text-3xl md:text-4xl font-bold mt-4 text-white/90">{slides[currentSlide].subtitle}</span>
          </h1>
          
          {/* 描述 */}
          <p className="text-2xl md:text-3xl mb-12 text-white/95 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed">
            {slides[currentSlide].desc}
          </p>
          
          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => setCurrentPage('products')}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,165,0,0.4)] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                🎢 探索产品
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="group px-10 py-5 bg-white/15 backdrop-blur-md text-white rounded-full font-bold text-xl border-2 border-white/40 hover:bg-white/25 hover:border-white/60 hover:scale-105 transition-all duration-300 shadow-xl"
            >
              💬 免费咨询
            </button>
          </div>
        </div>
        
        {/* 轮播控制按钮 */}
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

      {/* 特色服务 - 美化版 */}
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

      {/* 产品展示 - 美化版 */}
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
              onClick={() => {
                if (setSelectedCategory && setCurrentPage) {
                  setSelectedCategory("木制系列")
                  setCurrentPage("products")
                  window.scrollTo(0, 0)
                }
              }}
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img 
                  src="/products/wooden/animal/21.jpg" 
                  alt="木制系列" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
              onClick={() => {
                if (setSelectedCategory && setCurrentPage) {
                  setSelectedCategory("木制系列")
                  setCurrentPage("products")
                  window.scrollTo(0, 0)
                }
              }}
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img 
                  src="/products/wooden/unique/25.jpg" 
                  alt="非标定制" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
              onClick={() => {
                if (setSelectedCategory && setCurrentPage) {
                  setSelectedCategory("拓展系列")
                  setCurrentPage("products")
                  window.scrollTo(0, 0)
                }
              }}
            >
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img 
                  src="/products/expansion/climbing/6.jpg" 
                  alt="拓展系列" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
              onClick={() => setCurrentPage('products')}
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

      {/* CTA Section - 美化版 */}
      <section className="relative py-40 overflow-hidden">
        {/* 多层渐变背景 */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        {/* 装饰性光晕 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        
        {/* 粒子效果 */}
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
            onClick={() => setCurrentPage('contact')}
            className="group px-14 py-6 bg-white text-[#FFA500] rounded-full font-black text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300"
          >
            📞 立即咨询
            <span className="ml-3 group-hover:translate-x-2 transition-transform inline-block">→</span>
          </button>
        </div>
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      {/* Hero - 美化版 */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        {/* 光晕 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* 粒子效果 */}
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
        
        {/* 装饰线条 */}
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
          
          {/* 数据卡片 - 美化版 */}
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
          
          {/* CTA 按钮 */}
          <div className="mt-16">
            <button className="group px-12 py-6 bg-white text-[#FFA500] rounded-full font-black text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300">
              📞 联系我们
              <span className="ml-3 group-hover:translate-x-2 transition-transform inline-block">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 故事 */}
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

      {/* 优势 */}
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
              <p className="text-gray-600">200+工程师和技术人员</p>
            </div>
            <div className="group bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🔬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">创新研发</h3>
              <p className="text-gray-600">年投入营收8%用于研发</p>
            </div>
            <div className="group bg-white rounded-3xl shadow-2xl p-8 text-center hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">贴心服务</h3>
              <p className="text-gray-600">7×24小时技术支持</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductsPage({ setSelectedProduct, selectedCategory, setSelectedCategory, setScrollPosition }: { setSelectedProduct: (product: any) => void, selectedCategory: string, setSelectedCategory: (category: string) => void, setScrollPosition: (position: number) => void }) {
  // 移除自动滚动到顶部的逻辑
  
  const products = [
    { name: '木制系列 - 橡果篇', category: '木制系列', images: ['/products/wooden/acorn/38.jpg'], desc: '橡果主题，黄花梨木材质，25-69 万', hot: false, price: '25-69 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - 动物篇', category: '木制系列', images: ['/products/wooden/animal/21.jpg', '/products/wooden/animal/22.jpg', '/products/wooden/animal/23.jpg'], desc: '兔子/青蛙/猫头鹰主题，黄花梨木材质，25-69 万', hot: true, price: '25-69 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - 塑木篇', category: '木制系列', images: ['/products/wooden/composite/24.jpg'], desc: '塑木材质，环保耐用，25-69 万', hot: false, price: '25-69 万', material: '塑木', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - PE 板篇', category: '木制系列', images: ['/products/wooden/pe-board/20.jpg'], desc: 'PE 板材质，安全环保，25-69 万', hot: false, price: '25-69 万', material: 'PE 板', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - 海盗船篇', category: '木制系列', images: ['/products/wooden/pirate-ship/39.jpg', '/products/wooden/pirate-ship/40.jpg', '/products/wooden/pirate-ship/41.jpg'], desc: '大型海盗船主题，36-125 万，公园爆款', hot: true, price: '36-125 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - 标准篇', category: '木制系列', images: ['/products/wooden/standard/32.jpg', '/products/wooden/standard/33.jpg', '/products/wooden/standard/34.jpg', '/products/wooden/standard/35.jpg', '/products/wooden/standard/36.jpg', '/products/wooden/standard/37.jpg'], desc: '标准款式，黄花梨木材质，25-69 万', hot: false, price: '25-69 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - 高塔篇', category: '木制系列', images: ['/products/wooden/tower/42.jpg'], desc: '高塔主题，黄花梨木材质，36-125 万', hot: false, price: '36-125 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '木制系列 - 奇艺篇', category: '木制系列', images: ['/products/wooden/unique/25.jpg', '/products/wooden/unique/26.jpg', '/products/wooden/unique/27.jpg', '/products/wooden/unique/28.jpg', '/products/wooden/unique/29.jpg', '/products/wooden/unique/30.jpg', '/products/wooden/unique/31.jpg'], desc: '植物大战僵尸/魔法屋主题，42-87 万', hot: true, price: '42-87 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '非标系列 - 定制产品', category: '非标系列', images: ['/products/custom/99.jpg', '/products/custom/100.jpg', '/products/custom/102.jpg', '/products/custom/103.jpg', '/products/custom/104.jpg', '/products/custom/105.jpg', '/products/custom/106.jpg', '/products/custom/107.jpg', '/products/custom/108.jpg', '/products/custom/109.jpg', '/products/custom/110.jpg', '/products/custom/111.jpg', '/products/custom/112.jpg', '/products/custom/113.jpg', '/products/custom/114.jpg', '/products/custom/115.jpg', '/products/custom/116.jpg'], desc: '按实际场地设计报价，独一无二', hot: true, price: '面议', material: '定制', size: '定制', age: '全年龄段' },
    { name: '拓展系列 - 攀爬篇', category: '拓展系列', images: ['/products/expansion/climbing/6.jpg', '/products/expansion/climbing/7.jpg', '/products/expansion/climbing/8.jpg'], desc: '攀岩墙/攀爬架，3.68 万起', hot: false, price: '3.68 万起', material: '镀锌管/绳网', size: '可定制', age: '6-15 岁' },
    { name: '拓展系列 - 综合篇', category: '拓展系列', images: ['/products/expansion/comprehensive/13.jpg'], desc: '综合拓展设备，3.68 万起', hot: false, price: '3.68 万起', material: '镀锌管/绳网', size: '可定制', age: '6-15 岁' },
    { name: '拓展系列 - 娃娃家篇', category: '拓展系列', images: ['/products/expansion/dollhouse/1.jpg', '/products/expansion/dollhouse/2.jpg', '/products/expansion/dollhouse/3.jpg'], desc: '娃娃家主题，3.68 万起', hot: false, price: '3.68 万起', material: '镀锌管/绳网', size: '可定制', age: '3-12 岁' },
    { name: '拓展系列 - 钻网篇', category: '拓展系列', images: ['/products/expansion/drilling-net/14.jpg', '/products/expansion/drilling-net/15.jpg', '/products/expansion/drilling-net/16.jpg'], desc: '钻网主题，3.68 万起', hot: false, price: '3.68 万起', material: '镀锌管/绳网', size: '可定制', age: '6-15 岁' },
    { name: '拓展系列 - 魔方篇', category: '拓展系列', images: ['/products/expansion/magic-cube/17.jpg', '/products/expansion/magic-cube/18.jpg', '/products/expansion/magic-cube/19.jpg'], desc: '魔方主题，3.68 万起', hot: false, price: '3.68 万起', material: '镀锌管/绳网', size: '可定制', age: '6-15 岁' },
    { name: '拓展系列 - 爬网篇', category: '拓展系列', images: ['/products/expansion/net-climbing/10.jpg', '/products/expansion/net-climbing/11.jpg', '/products/expansion/net-climbing/12.jpg', '/products/expansion/net-climbing/9.jpg'], desc: '绳网攀爬/钻网，适合公园学校', hot: false, price: '面议', material: '绳网', size: '可定制', age: '6-15 岁' },
    { name: '拓展系列 - 廊架篇', category: '拓展系列', images: ['/products/expansion/pergola/4.jpg', '/products/expansion/pergola/5.jpg'], desc: '廊架主题，3.68 万起', hot: false, price: '3.68 万起', material: '镀锌管/绳网', size: '可定制', age: '6-15 岁' },
    { name: '配套系列 - 柜子', category: '配套系列', images: ['/products/accessories/cabinets/87.jpg'], desc: '储物柜，1-5 万', hot: false, price: '1-5 万', material: '黄花梨木', size: '可定制', age: '全年龄段' },
    { name: '配套系列 - 体能篇', category: '配套系列', images: ['/products/accessories/fitness/77.jpg', '/products/accessories/fitness/78.jpg', '/products/accessories/fitness/79.jpg', '/products/accessories/fitness/80.jpg', '/products/accessories/fitness/81.jpg', '/products/accessories/fitness/82.jpg'], desc: '平衡木/攀爬架/钻洞，黄花梨木', hot: false, price: '面议', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '配套系列 - 种植篇', category: '配套系列', images: ['/products/accessories/gardening/96.jpg', '/products/accessories/gardening/97.jpg'], desc: '种植箱，1-5 万', hot: false, price: '1-5 万', material: '黄花梨木', size: '可定制', age: '全年龄段' },
    { name: '配套系列 - 健身器材篇', category: '配套系列', images: ['/products/accessories/gym-equipment/83.jpg', '/products/accessories/gym-equipment/84.jpg'], desc: '健身器材，1-5 万', hot: false, price: '1-5 万', material: '镀锌管', size: '可定制', age: '全年龄段' },
    { name: '配套系列 - 乐器篇', category: '配套系列', images: ['/products/accessories/musical-instruments/76.jpg'], desc: '乐器，1-5 万', hot: false, price: '1-5 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '配套系列 - PE 摇马篇', category: '配套系列', images: ['/products/accessories/pe-horse/73.jpg'], desc: 'PE 摇马，1-5 万', hot: false, price: '1-5 万', material: 'PE', size: '可定制', age: '3-12 岁' },
    { name: '配套系列 - 玩沙篇', category: '配套系列', images: ['/products/accessories/sand-play/90.jpg', '/products/accessories/sand-play/91.jpg'], desc: '玩沙设备，1-5 万', hot: false, price: '1-5 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '配套系列 - 座椅篇', category: '配套系列', images: ['/products/accessories/seats/85.jpg'], desc: '座椅，1-5 万', hot: false, price: '1-5 万', material: '黄花梨木', size: '可定制', age: '全年龄段' },
    { name: '配套系列 - 不锈钢滑梯', category: '配套系列', images: ['/products/accessories/stainless-slides/74.jpg', '/products/accessories/stainless-slides/75.jpg'], desc: '不锈钢滑梯，1-5 万', hot: false, price: '1-5 万', material: '304 不锈钢', size: '可定制', age: '3-12 岁' },
    { name: '配套系列 - 童车篇', category: '配套系列', images: ['/products/accessories/strollers/98.jpg'], desc: '童车，1-5 万', hot: false, price: '1-5 万', material: '黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '配套系列 - 秋千篇', category: '配套系列', images: ['/products/accessories/swings/92.jpg', '/products/accessories/swings/93.jpg', '/products/accessories/swings/94.jpg', '/products/accessories/swings/95.jpg'], desc: '多种秋千组合，镀锌管/黄花梨木', hot: false, price: '面议', material: '镀锌管/黄花梨木', size: '可定制', age: '3-12 岁' },
    { name: '配套系列 - 戏水篇', category: '配套系列', images: ['/products/accessories/water-play/86.jpg'], desc: '304 不锈钢戏水设备', hot: false, price: '面议', material: '304 不锈钢', size: '可定制', age: '全年龄段' },
    { name: '配套系列 - 滑索', category: '配套系列', images: ['/products/accessories/zipline/88.jpg', '/products/accessories/zipline/89.jpg'], desc: '滑索，1-5 万', hot: false, price: '1-5 万', material: '镀锌管', size: '可定制', age: '6-15 岁' },
  ]

  const categories = ['全部', '木制系列', '非标系列', '拓展系列', '配套系列']
  
  const filteredProducts = selectedCategory === '全部' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div>
      {/* Hero - 美化版 */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        {/* 光晕 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* 粒子效果 */}
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
        
        {/* 装饰线条 */}
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
            产品中心
            <span className="block text-3xl md:text-4xl font-bold mt-4 text-white/90">Product Center</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-white/95 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed">
            100+款游乐设备，满足各种场景需求
          </p>
        </div>
      </section>

      {/* 产品列表 - 美化版 */}
      <section className="py-40 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => {
              const count = cat === '全部' 
                ? products.length 
                : products.filter(p => p.category === cat).length
              return (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-3 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white shadow-2xl hover:shadow-[0_20px_60px_rgba(255,165,0,0.4)]' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl'
                  }`}
                >
                  {cat}
                  <span className={`text-xs px-3 py-1.5 rounded-full ${
                    selectedCategory === cat
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FFA500]/10 text-[#FF8C00]'
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
                onClick={() => {
                  setScrollPosition(window.scrollY)
                  setSelectedProduct(product)
                }}
                className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 cursor-pointer border-2 border-transparent hover:border-[#FFA500]/30"
              >
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                  />
                  {product.hot && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      🔥 热门
                    </div>
                  )}
                  {product.images.length > 1 && (
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      🖼️ {product.images.length}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <span className="text-sm text-[#FF8C00] font-semibold bg-[#FFA500]/10 px-4 py-2 rounded-full">{product.category}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-3 group-hover:text-[#FFA500] transition-colors">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.desc}</p>
                  <button 
                    onClick={(e) => {
                    e.stopPropagation()
                    setScrollPosition(window.scrollY)
                    setSelectedProduct(product)
                  }}
                    className="group/btn text-[#FF8C00] font-semibold hover:text-[#FF6B35] flex items-center gap-2 transition-all"
                  >
                    了解详情 
                    <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
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
    <div>
      {/* Hero - 美化版 */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        {/* 光晕 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* 粒子效果 */}
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
        
        {/* 装饰线条 */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-45"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-8">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg">
              🛠️ 全方位服务支持
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight">
            服务支持
            <span className="block text-3xl md:text-4xl font-bold mt-4 text-white/90">Service Support</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-white/95 drop-shadow-lg max-w-3xl mx-auto font-light">
            从咨询到售后，全程陪伴
          </p>
        </div>
      </section>

      {/* 服务流程 - 美化版 */}
      <section className="py-40 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={service.number} className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4">
                <div className="flex items-start gap-6 p-8">
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] text-white rounded-2xl flex items-center justify-center text-4xl font-black shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {service.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl group-hover:scale-110 transition-transform">{service.icon}</span>
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#FFA500] transition-colors">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{service.desc}</p>
                  </div>
                </div>
                {index < services.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-[#FFA500]/30 to-transparent mx-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - 美化版 */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden bg-gradient-to-r from-[#FFA500] to-[#FF8C00] rounded-3xl p-12 md:p-16 text-white text-center">
            {/* 装饰性光晕 */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">需要定制方案？</h2>
              <p className="text-xl opacity-95 mb-10 max-w-2xl mx-auto font-light">
                告诉我们您的需求，24小时内为您提供专业方案
              </p>
              <button className="group px-14 py-6 bg-white text-[#FFA500] rounded-full font-black text-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300">
                📞 立即咨询
                <span className="ml-3 group-hover:translate-x-2 transition-transform inline-block">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactPage() {
  return (
    <div>
      {/* Hero - 美化版 */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        {/* 光晕 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* 粒子效果 */}
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
        
        {/* 装饰线条 */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-45"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-8">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg">
              📞 期待与您合作
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight">
            联系我们
            <span className="block text-3xl md:text-4xl font-bold mt-4 text-white/90">Contact Us</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-white/95 drop-shadow-lg max-w-3xl mx-auto font-light">
            期待与您合作，共创美好未来
          </p>
        </div>
      </section>

      {/* 联系内容 - 美化版 */}
      <section className="py-40 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 表单 */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-transparent hover:border-[#FFA500]/30 transition-all">
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] px-6 py-2 rounded-full text-white text-sm font-semibold shadow-lg">
                  ✍️ 发送消息
                </div>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-8">联系我们</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">姓名</label>
                  <input type="text" className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#FFA500]/30 focus:border-[#FFA500] transition-all text-lg" placeholder="您的姓名" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">邮箱</label>
                  <input type="email" className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#FFA500]/30 focus:border-[#FFA500] transition-all text-lg" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">电话</label>
                  <input type="tel" className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#FFA500]/30 focus:border-[#FFA500] transition-all text-lg" placeholder="您的联系电话" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">留言</label>
                  <textarea rows={5} className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#FFA500]/30 focus:border-[#FFA500] transition-all text-lg resize-none" placeholder="请描述您的需求..."></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white py-5 rounded-2xl font-black text-xl hover:shadow-[0_20px_60px_rgba(255,165,0,0.4)] transition-all shadow-xl">
                  提交留言
                </button>
              </form>
            </div>

            {/* 联系信息 */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-transparent hover:border-[#FFA500]/30 transition-all hover:-translate-y-2">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900 mb-1">公司地址</h3>
                    <p className="text-gray-600">浙江省温州市永嘉县桥下镇小京工业区</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-transparent hover:border-[#FFA500]/30 transition-all hover:-translate-y-2">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900 mb-1">联系电话</h3>
                    <p className="text-gray-600">13676792779（汪总）</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-transparent hover:border-[#FFA500]/30 transition-all hover:-translate-y-2">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                    📧
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900 mb-1">电子邮箱</h3>
                    <p className="text-gray-600">240345062@qq.com</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-transparent hover:border-[#FFA500]/30 transition-all hover:-translate-y-2">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                    🕐
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900 mb-1">工作时间</h3>
                    <p className="text-gray-600">周一至周五 9:00-18:00</p>
                  </div>
                </div>
              </div>
              
              {/* 社交媒体 */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-transparent hover:border-[#FFA500]/30 transition-all">
                <h3 className="font-black text-xl text-gray-900 mb-6">关注我们</h3>
                <div className="flex gap-4">
                  {['💬', '📱', '🎵', '📸'].map((emoji, i) => (
                    <button key={i} className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-3xl text-white hover:scale-110 hover:shadow-xl transition-all">
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

function Footer({ setCurrentPage, setSelectedCategory }: { setCurrentPage: (page: string) => void, setSelectedCategory: (category: string) => void }) {
  return (
    <footer className="relative py-20" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}>
      {/* 光晕 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.jpg" alt="圆郎娱乐" className="w-12 h-12 object-contain rounded-xl shadow-lg bg-white" />
              <h3 className="text-2xl font-black text-white">圆郎娱乐</h3>
            </div>
            <p className="text-white/90 leading-relaxed text-lg">专业游乐设备制造商，创造无限欢乐</p>
          </div>
          <div>
            <h4 className="font-black text-xl text-white mb-6">快速链接</h4>
            <ul className="space-y-3 text-white/90">
              <li 
                onClick={() => { setCurrentPage("about"); setTimeout(() => window.scrollTo(0, 0), 100); }} 
                className="hover:text-white cursor-pointer transition-colors text-lg font-medium hover:translate-x-2 transition-transform"
              >关于我们</li>
              <li 
                onClick={() => { setCurrentPage("products"); setTimeout(() => window.scrollTo(0, 0), 100); }} 
                className="hover:text-white cursor-pointer transition-colors text-lg font-medium hover:translate-x-2 transition-transform"
              >产品中心</li>
              <li 
                onClick={() => { setCurrentPage("services"); setTimeout(() => window.scrollTo(0, 0), 100); }} 
                className="hover:text-white cursor-pointer transition-colors text-lg font-medium hover:translate-x-2 transition-transform"
              >服务支持</li>
              <li 
                onClick={() => { setCurrentPage("contact"); setTimeout(() => window.scrollTo(0, 0), 100); }} 
                className="hover:text-white cursor-pointer transition-colors text-lg font-medium hover:translate-x-2 transition-transform"
              >联系方式</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl text-white mb-6">产品分类</h4>
            <ul className="space-y-3 text-white/90">
              <li 
                onClick={() => { setSelectedCategory("木制系列"); setCurrentPage("products"); setTimeout(() => window.scrollTo(0, 0), 100); }} 
                className="hover:text-white cursor-pointer transition-colors text-lg font-medium hover:translate-x-2 transition-transform"
              >木制系列</li>
              <li 
                onClick={() => { setSelectedCategory("非标系列"); setCurrentPage("products"); setTimeout(() => window.scrollTo(0, 0), 100); }} 
                className="hover:text-white cursor-pointer transition-colors text-lg font-medium hover:translate-x-2 transition-transform"
              >非标系列</li>
              <li 
                onClick={() => { setSelectedCategory("拓展系列"); setCurrentPage("products"); setTimeout(() => window.scrollTo(0, 0), 100); }} 
                className="hover:text-white cursor-pointer transition-colors text-lg font-medium hover:translate-x-2 transition-transform"
              >拓展系列</li>
              <li 
                onClick={() => { setSelectedCategory("配套系列"); setCurrentPage("products"); setTimeout(() => window.scrollTo(0, 0), 100); }} 
                className="hover:text-white cursor-pointer transition-colors text-lg font-medium hover:translate-x-2 transition-transform"
              >配套系列</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl text-white mb-6">联系我们</h4>
            <ul className="space-y-3 text-white/90">
              <li className="text-lg"><span className="mr-2">📞</span> 13676792779（汪总）</li>
              <li className="text-lg"><span className="mr-2">📧</span> 240345062@qq.com</li>
              <li className="text-lg"><span className="mr-2">📍</span> 浙江省温州市永嘉县桥下镇小京工业区</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/30 pt-8 text-center text-white/80">
          <p className="text-lg font-medium">&copy; 2026 圆郎娱乐设备有限公司。All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}



function ProductDetailPage({ product, onBack, openImageModal }: { product: any, onBack: () => void, openImageModal: (images: string[], index?: number) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }
  
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
  }
  
  return (
    <div>
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
              <div className="relative">
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={`${product.name} - 图片 ${currentImageIndex + 1}`} 
                  className="w-full h-96 object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
                  onClick={() => {
                    openImageModal(product.images, currentImageIndex)
                  }}
                />
                
                {/* 左右切换按钮 */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    >
                      ‹
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              
              {/* 图片计数器 */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
              
              {/* 缩略图 */}
              {product.images.length > 1 && (
                <div className="flex gap-3 p-4 overflow-x-auto">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? 'border-primary opacity-100' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`缩略图 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
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
                  <a href="tel:13676792779" className="block w-full bg-gradient-to-r from-primary to-accent text-white text-center py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                    立即咨询 📞
                  </a>
                  <a href="tel:13676792779" className="block w-full bg-white border-2 border-primary text-primary text-center py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all">
                    拨打电话
                  </a>
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
    { title: '某市第一幼儿园', location: '浙江省温州市', image: '/products/wooden/animal/21.jpg', desc: '大型木制淘气堡组合，面积 300㎡，2024 年 3 月完工', tags: ['幼儿园', '木制系列'] },
    { title: 'XX 房地产售楼部', location: '江苏省南京市', image: '/products/wooden/unique/25.jpg', desc: '高端定制儿童游乐区，提升楼盘品质，2024 年 1 月完工', tags: ['房地产', '非标定制'] },
    { title: '某国际幼儿园', location: '上海市', image: '/products/expansion/climbing/6.jpg', desc: '户外拓展攀爬组合，面积 500㎡，2023 年 12 月完工', tags: ['幼儿园', '拓展系列'] },
    { title: 'XX 商场儿童乐园', location: '浙江省杭州市', image: '/products/wooden/pirate-ship/39.jpg', desc: '室内海盗船主题乐园，面积 800㎡，2023 年 10 月完工', tags: ['商场', '木制系列'] },
    { title: '某公园无动力乐园', location: '福建省厦门市', image: '/products/accessories/swings/92.jpg', desc: '大型户外无动力游乐设施，面积 2000㎡，2023 年 8 月完工', tags: ['公园', '拓展系列'] },
    { title: 'XX 度假村亲子乐园', location: '海南省三亚市', image: '/products/accessories/water-play/86.jpg', desc: '亲子互动游乐设施，面积 1500㎡，2023 年 5 月完工', tags: ['度假村', '配套系列'] },
  ]

  return (
    <div>
      {/* Hero - 美化版 */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        {/* 光晕 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* 粒子效果 */}
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
        
        {/* 装饰线条 */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-45"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-8">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg">
              🎢 遍布全国 50+ 城市
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight">
            成功案例
            <span className="block text-3xl md:text-4xl font-bold mt-4 text-white/90">Success Cases</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-white/95 drop-shadow-lg max-w-3xl mx-auto font-light">
            1000+ 成功案例，为客户创造价值
          </p>
          
          {/* 案例类型标签 */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/15 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold border border-white/30 hover:bg-white/25 transition-all cursor-pointer hover:scale-105">
              🏫 幼儿园
            </div>
            <div className="bg-white/15 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold border border-white/30 hover:bg-white/25 transition-all cursor-pointer hover:scale-105">
              🏢 商场
            </div>
            <div className="bg-white/15 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold border border-white/30 hover:bg-white/25 transition-all cursor-pointer hover:scale-105">
              🌳 公园
            </div>
            <div className="bg-white/15 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold border border-white/30 hover:bg-white/25 transition-all cursor-pointer hover:scale-105">
              🏨 度假村
            </div>
            <div className="bg-white/15 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold border border-white/30 hover:bg-white/25 transition-all cursor-pointer hover:scale-105">
              🏗️ 房地产
            </div>
          </div>
        </div>
      </section>

      {/* 案例列表 - 美化版 */}
      <section className="py-40 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((item, index) => (
              <div key={index} className="group bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30">
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-[#FFA500]/10 text-[#FF8C00] px-3 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
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
    { title: '圆郎娱乐参加 2024 年广州幼教展', date: '2024-03-15', category: '公司新闻', excerpt: '3 月 15 日，圆郎娱乐携最新产品亮相广州国际幼教展，吸引众多客户参观咨询...' },
    { title: '新产品上市：海盗船系列全新升级', date: '2024-02-20', category: '产品动态', excerpt: '经过 6 个月研发，海盗船系列全新升级，采用更环保的黄花梨木材质...' },
    { title: '圆郎娱乐通过 ISO9001 质量认证', date: '2024-01-10', category: '公司荣誉', excerpt: '近日，圆郎娱乐正式通过 ISO9001 质量管理体系认证...' },
    { title: '行业资讯：2024 年儿童游乐设备市场趋势', date: '2024-01-05', category: '行业资讯', excerpt: '随着消费升级，家长对儿童游乐设备的品质要求越来越高...' },
  ]

  return (
    <div>
      {/* Hero - 美化版 */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 35%, #FF8C00 70%, #FFD700 100%)', backgroundSize: '300% 300%', animation: 'aurora 15s ease-in-out infinite'}}></div>
        
        {/* 光晕 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* 粒子效果 */}
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
        
        {/* 装饰线条 */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-white/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/20 rotate-45"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-8">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg">
              📰 最新动态
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight">
            新闻中心
            <span className="block text-3xl md:text-4xl font-bold mt-4 text-white/90">News Center</span>
          </h1>
          
          <p className="text-2xl md:text-3xl mb-12 text-white/95 drop-shadow-lg max-w-3xl mx-auto font-light">
            了解圆郎娱乐最新动态
          </p>
        </div>
      </section>

      {/* 新闻列表 - 美化版 */}
      <section className="py-40 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-6">
            {news.map((item, index) => (
              <div key={index} className="group bg-white rounded-3xl shadow-2xl p-8 hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30 cursor-pointer">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm bg-[#FFA500]/10 text-[#FF8C00] px-4 py-2 rounded-full font-semibold">{item.category}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#FFA500] transition-colors">{item.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.excerpt}</p>
                  </div>
                  <div className="text-[#FF8C00] text-3xl group-hover:translate-x-2 transition-transform">›</div>
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
