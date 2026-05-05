export default function ServicesPage() {
  const services = [
    {
      id: '1',
      icon: '🎨',
      title: '专业设计',
      desc: '资深设计师团队，根据场地特点量身定制方案',
      features: ['免费上门测量', '3D效果图', '方案优化']
    },
    {
      id: '2',
      icon: '🛠️',
      title: '安装施工',
      desc: '专业施工团队，确保安全高效完成安装',
      features: ['持证上岗', '安全保障', '工期保证']
    },
    {
      id: '3',
      icon: '🔧',
      title: '售后维护',
      desc: '完善的售后服务体系，让您无后顾之忧',
      features: ['定期巡检', '快速响应', '终身维护']
    },
    {
      id: '4',
      icon: '📊',
      title: '项目咨询',
      desc: '专业顾问一对一服务，解答您的疑问',
      features: ['免费咨询', '方案报价', '技术支持']
    }
  ];

  const processSteps = [
    { step: '01', title: '需求沟通', desc: '了解客户需求和场地情况' },
    { step: '02', title: '方案设计', desc: '提供专业设计方案和报价' },
    { step: '03', title: '签订合同', desc: '确认方案，签订合作协议' },
    { step: '04', title: '生产安装', desc: '工厂生产，现场安装调试' },
    { step: '05', title: '验收交付', desc: '客户验收，交付使用' }
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
              🚀 服务保障
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">营销服务</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            一站式服务，从设计到售后全程无忧
          </p>
        </div>
      </section>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl shadow-xl p-8 hover:shadow-[0_20px_60px_rgba(255,165,0,0.15)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FFA500] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-[#FFA500] rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">服务流程</h2>
            <p className="text-xl text-gray-600">简单5步，轻松完成项目</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-black text-[#FFA500] mb-3">{step.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#FFA500]/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}