import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', phone: '', email: '', company: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: '公司地址',
      content: '广东省广州市番禺区石基镇永善村永峰路88号'
    },
    {
      icon: '📞',
      title: '联系电话',
      content: '400-888-8888'
    },
    {
      icon: '📧',
      title: '电子邮箱',
      content: 'contact@yuanlang.com'
    },
    {
      icon: '⏰',
      title: '工作时间',
      content: '周一至周五 8:00-18:00'
    }
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
              💬 联系我们
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">联系我们</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            专业团队随时为您服务，24小时内回复
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">📍 地图位置</h3>
              <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p>地图加载中...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">发送消息</h2>
            
            {submitted && (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 flex items-center gap-2">
                <span className="text-xl">✓</span>
                消息已发送，我们会尽快回复您！
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] transition-all"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">电话 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] transition-all"
                    placeholder="请输入您的电话"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] transition-all"
                    placeholder="请输入您的邮箱"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] transition-all"
                    placeholder="请输入公司名称"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">留言内容 *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFA500] transition-all resize-none"
                  placeholder="请描述您的需求..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-[0_10px_30px_rgba(255,165,0,0.4)] transition-all hover:scale-[1.02]"
              >
                📤 发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}