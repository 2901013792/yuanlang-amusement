export default function NewsPage() {
  const news = [
    {
      id: '1',
      date: '2024-01-15',
      category: '公司动态',
      title: '圆郎娱乐荣获2023年度行业创新奖',
      desc: '近日，圆郎娱乐凭借创新的游乐设备设计和优质的服务，荣获2023年度中国游乐行业创新奖。',
      image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=award%20ceremony%20trophy%20celebration&size=800x600'
    },
    {
      id: '2',
      date: '2024-01-10',
      category: '新品发布',
      title: '新品上市：智能互动游乐设备',
      desc: '圆郎娱乐全新推出智能互动游乐设备系列，融合AR技术，为儿童带来全新的游乐体验。',
      image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=modern%20playground%20equipment%20colorful&size=800x600'
    },
    {
      id: '3',
      date: '2024-01-05',
      category: '行业资讯',
      title: '2024年游乐行业发展趋势展望',
      desc: '随着人们对儿童游乐需求的不断增长，2024年游乐行业将迎来新的发展机遇。',
      image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=playground%20trends%20futuristic%20design&size=800x600'
    },
    {
      id: '4',
      date: '2023-12-28',
      category: '项目案例',
      title: '深圳大型商场游乐区项目顺利完工',
      desc: '由圆郎娱乐承接的深圳某大型商场室内儿童游乐区项目已顺利完工并投入使用。',
      image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=indoor%20playground%20colorful%20modern&size=800x600'
    },
    {
      id: '5',
      date: '2023-12-20',
      category: '公司动态',
      title: '圆郎娱乐参加2023中国国际游乐设施展',
      desc: '圆郎娱乐携多款新品亮相2023中国国际游乐设施展，吸引众多国内外客户关注。',
      image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=trade%20show%20exhibition%20booth&size=800x600'
    },
    {
      id: '6',
      date: '2023-12-15',
      category: '安全知识',
      title: '儿童游乐设施安全使用指南',
      desc: '为确保儿童在游乐过程中的安全，家长和管理者需要了解一些基本的安全知识。',
      image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=children%20playing%20safe%20playground&size=800x600'
    }
  ];

  const categories = ['全部', '公司动态', '新品发布', '行业资讯', '项目案例', '安全知识'];

  return (
    <div className="py-32">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500] to-[#FF8C00]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm font-semibold border border-white/30">
              📰 新闻资讯
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">新闻中心</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            了解最新行业动态和公司资讯
          </p>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 bg-white rounded-full text-gray-700 font-medium shadow hover:shadow-lg hover:bg-[#FFA500] hover:text-white transition-all"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.2)] transition-all duration-500 hover:-translate-y-4 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#FFA500] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-400 mb-2">{item.date}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">{item.desc}</p>
                <button className="mt-4 text-[#FFA500] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  阅读更多 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}