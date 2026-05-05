export default function CasesPage() {
  const cases = [
    {
      id: '1',
      title: '北京某幼儿园游乐区',
      location: '北京',
      type: '幼儿园',
      image: '/products/projects/117.webp',
      desc: '为北京某知名幼儿园打造的户外游乐区，包含木质滑梯、攀爬架等设施'
    },
    {
      id: '2',
      title: '上海世纪公园项目',
      location: '上海',
      type: '公园',
      image: '/products/projects/118.webp',
      desc: '上海世纪公园大型户外游乐设施项目，占地面积500平方米'
    },
    {
      id: '3',
      title: '深圳购物中心',
      location: '深圳',
      type: '商场',
      image: '/products/projects/119.webp',
      desc: '深圳某大型购物中心室内儿童游乐区设计与安装'
    },
    {
      id: '4',
      title: '杭州景区配套',
      location: '杭州',
      type: '景区',
      image: '/products/projects/120.webp',
      desc: '杭州某4A级景区配套游乐设施项目'
    },
    {
      id: '5',
      title: '成都社区公园',
      location: '成都',
      type: '社区',
      image: '/products/projects/121.webp',
      desc: '成都某大型社区户外游乐设施项目'
    },
    {
      id: '6',
      title: '广州学校项目',
      location: '广州',
      type: '学校',
      image: '/products/projects/122.webp',
      desc: '广州某小学综合体能训练设施项目'
    }
  ];

  const stats = [
    { value: '1000+', label: '成功案例' },
    { value: '50+', label: '覆盖城市' },
    { value: '500万+', label: '服务人次' },
    { value: '98%', label: '客户满意度' }
  ];

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
              🏆 成功案例
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">精彩案例</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            1000+成功案例遍布全国，为客户创造价值
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl md:text-5xl font-black text-[#FFA500] mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.2)] transition-all duration-500 hover:-translate-y-4 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={caseItem.image}
                  alt={caseItem.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {caseItem.location}
                  </span>
                  <span className="bg-[#FFA500] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {caseItem.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">
                  {caseItem.title}
                </h3>
                <p className="text-gray-600 text-sm">{caseItem.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}