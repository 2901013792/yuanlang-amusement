import { useState } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />
      case 'about': return <AboutPage />
      case 'products': return <ProductsPage />
      case 'services': return <ServicesPage />
      case 'contact': return <ContactPage />
      default: return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  )
}

function Navigation({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-secondary">圆郎游乐</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'products', 'services', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  currentPage === page
                    ? 'text-primary bg-orange-50'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {page === 'home' && '首页'}
                {page === 'about' && '关于我们'}
                {page === 'products' && '产品中心'}
                {page === 'services' && '服务支持'}
                {page === 'contact' && '联系方式'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">创造无限欢乐</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">专业游乐设备制造商，为您打造梦幻游乐世界</p>
          <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            探索产品
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-secondary mb-16">为什么选择我们</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎢"
              title="专业设计"
              description="20 年行业经验，创新设计与安全标准完美结合"
            />
            <FeatureCard
              icon="🛡️"
              title="安全认证"
              description="通过 ISO、CE、TUV 等国际安全认证，品质可靠"
            />
            <FeatureCard
              icon="🌍"
              title="全球服务"
              description="产品出口 50+ 国家，提供全方位安装与维护支持"
            />
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-secondary mb-16">热门产品</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard
              name="旋转木马"
              image="🎠"
              description="经典游乐项目，适合全年龄段"
            />
            <ProductCard
              name="过山车"
              image="🎢"
              description="刺激体验，主题公园必备"
            />
            <ProductCard
              name="摩天轮"
              image="🎡"
              description="浪漫地标，城市夜景亮点"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-secondary text-center mb-16">关于圆郎游乐</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">我们的故事</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              圆郎游乐成立于 2005 年，是一家专业从事游乐设备研发、设计、制造的企业。
              我们致力于为全球客户提供高品质、创新型的游乐解决方案。
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              经过近 20 年的发展，我们已成为行业领先品牌，产品遍布全球 50 多个国家和地区，
              服务超过 1000 个主题公园和游乐场。
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-white text-center">
            <div className="grid grid-cols-2 gap-8">
              <Stat number="20+" label="年行业经验" />
              <Stat number="1000+" label="成功案例" />
              <Stat number="50+" label="出口国家" />
              <Stat number="500+" label="专业团队" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">我们的优势</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <AdvantageCard icon="🏆" title="行业认证" desc="ISO9001、CE、TUV 认证" />
            <AdvantageCard icon="👨‍🔧" title="专业团队" desc="200+ 工程师和技术人员" />
            <AdvantageCard icon="🔬" title="创新研发" desc="年投入营收 8% 用于研发" />
            <AdvantageCard icon="🤝" title="贴心服务" desc="7×24 小时技术支持" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsPage() {
  const products = [
    { name: '旋转木马', icon: '🎠', category: '家庭游乐', desc: '经典旋转项目，精美造型，适合亲子游玩' },
    { name: '过山车', icon: '🎢', category: '刺激项目', desc: '高速轨道，多重翻转，极致刺激体验' },
    { name: '摩天轮', icon: '🎡', category: '观景设施', desc: '城市地标，浪漫观景，适合各年龄段' },
    { name: '海盗船', icon: '🏴‍☠️', category: '摆动项目', desc: '摇摆幅度可达 60 度，惊险刺激' },
    { name: '碰碰车', icon: '🚗', category: '互动游乐', desc: '趣味碰撞，亲子互动，场地灵活' },
    { name: '跳楼机', icon: '🗼', category: '刺激项目', desc: '自由落体体验，高空俯瞰，心跳加速' },
    { name: '旋转茶杯', icon: '☕', category: '家庭游乐', desc: '温馨可爱，旋转可控，适合儿童' },
    { name: '鬼屋', icon: '👻', category: '主题体验', desc: '沉浸式恐怖体验，高科技特效' },
    { name: '水上乐园设备', icon: '🌊', category: '水上项目', desc: '滑梯、造浪池、漂流河全套解决方案' },
  ]

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-secondary text-center mb-8">产品中心</h1>
        <p className="text-xl text-gray-600 text-center mb-16">100+ 款游乐设备，满足各种场景需求</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-8xl">
                {product.icon}
              </div>
              <div className="p-6">
                <span className="text-sm text-primary font-semibold">{product.category}</span>
                <h3 className="text-2xl font-bold text-secondary mt-2">{product.name}</h3>
                <p className="text-gray-600 mt-3">{product.desc}</p>
                <button className="mt-4 text-primary font-semibold hover:text-orange-600">
                  了解详情 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServicesPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-secondary text-center mb-8">服务支持</h1>
        <p className="text-xl text-gray-600 text-center mb-16">从咨询到售后，全程陪伴</p>

        <div className="space-y-16">
          <ServiceStep
            number="01"
            title="需求咨询"
            desc="专业顾问团队，根据您的场地、预算、目标客群提供定制化方案建议"
            icon="💬"
          />
          <ServiceStep
            number="02"
            title="方案设计"
            desc="3D 效果图呈现，多轮沟通优化，确保方案完美契合您的需求"
            icon="📐"
          />
          <ServiceStep
            number="03"
            title="生产制造"
            desc="现代化生产基地，严格质量管控，按期交付高品质设备"
            icon="🏭"
          />
          <ServiceStep
            number="04"
            title="安装指导"
            desc="派遣专业工程师现场指导安装，或提供详细安装视频和文档"
            icon="🔧"
          />
          <ServiceStep
            number="05"
            title="售后维护"
            desc="质保期内免费维护，终身技术支持，配件快速供应"
            icon="🛠️"
          />
        </div>

        <div className="mt-20 bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">需要定制方案？</h2>
          <p className="text-lg opacity-90 mb-8">告诉我们您的需求，24 小时内为您提供专业方案</p>
          <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
            立即咨询
          </button>
        </div>
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-secondary text-center mb-8">联系我们</h1>
        <p className="text-xl text-gray-600 text-center mb-16">期待与您合作，共创美好未来</p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary mb-6">发送消息</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">姓名</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="您的姓名" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">邮箱</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">电话</label>
                <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="您的联系电话" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">留言</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请描述您的需求..."></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors">
                提交留言
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <ContactInfo
              icon="📍"
              title="公司地址"
              content="中国·广东省·广州市·番禺区"
            />
            <ContactInfo
              icon="📞"
              title="联系电话"
              content="+86 400-XXX-XXXX"
            />
            <ContactInfo
              icon="📧"
              title="电子邮箱"
              content="info@yuanlang-amusement.com"
            />
            <ContactInfo
              icon="🕐"
              title="工作时间"
              content="周一至周五 9:00-18:00"
            />
            
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <h3 className="text-xl font-bold text-secondary mb-4">关注我们</h3>
              <div className="flex space-x-4 text-3xl">
                <span className="cursor-pointer hover:opacity-70">💬</span>
                <span className="cursor-pointer hover:opacity-70">📱</span>
                <span className="cursor-pointer hover:opacity-70">🎵</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">圆郎游乐</h3>
            <p className="opacity-80">专业游乐设备制造商，创造无限欢乐</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">快速链接</h4>
            <ul className="space-y-2 opacity-80">
              <li>关于我们</li>
              <li>产品中心</li>
              <li>服务支持</li>
              <li>联系方式</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">产品分类</h4>
            <ul className="space-y-2 opacity-80">
              <li>家庭游乐</li>
              <li>刺激项目</li>
              <li>水上乐园</li>
              <li>主题定制</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">联系我们</h4>
            <ul className="space-y-2 opacity-80">
              <li>📞 400-XXX-XXXX</li>
              <li>📧 info@yuanlang.com</li>
              <li>📍 广州市番禺区</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center opacity-80">
          <p>&copy; 2026 圆郎游乐设备有限公司。All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// 小组件
function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function ProductCard({ name, image, description }: { name: string, image: string, description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-7xl">
        {image}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-secondary mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

function Stat({ number, label }: { number: string, label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="opacity-80">{label}</div>
    </div>
  )
}

function AdvantageCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-secondary mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  )
}

function ServiceStep({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: string }) {
  return (
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
        {number}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-3xl">{icon}</span>
          <h3 className="text-2xl font-bold text-secondary">{title}</h3>
        </div>
        <p className="text-gray-600 text-lg">{desc}</p>
      </div>
    </div>
  )
}

function ContactInfo({ icon, title, content }: { icon: string, title: string, content: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <h3 className="font-bold text-secondary">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  )
}

export default App
