import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  desc: string;
  hot: boolean;
  price: string;
  material: string;
  size: string;
  age: string;
}

interface ProductsPageProps {
  products: Product[];
  productsLoading: boolean;
  onSelectProduct: (product: Product) => void;
  selectedCategory: string;
  setCategory: (category: string) => void;
  openImageModal: (images: string[], index?: number) => void;
}

const categories = ['全部', '木制系列', '拓展系列', '配套系列', '非标系列'];

export default function ProductsPage({ 
  products, 
  productsLoading, 
  onSelectProduct, 
  selectedCategory, 
  setCategory,
  openImageModal
}: ProductsPageProps) {
  const [activeFilter, setActiveFilter] = useState(selectedCategory);

  const filteredProducts = activeFilter === '全部' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    setCategory(category);
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-40">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFA500] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] px-8 py-3 rounded-full text-white text-sm font-semibold shadow-lg">
              🎢 产品中心
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">产品展示</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            精选100+款游乐设备，满足幼儿园、公园、商场等各种场景需求
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-[0_20px_60px_rgba(255,165,0,0.2)] transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-[#FFA500]/30"
              >
                <div className="relative h-72 bg-gray-100 overflow-hidden">
                  {/* 主图 */}
                  <img
                    src={product.images[0] || '/products/wooden/animal/21.webp'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onClick={() => openImageModal(product.images)}
                    style={{ cursor: 'zoom-in' }}
                  />
                  {product.hot && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      🔥 热销
                    </div>
                  )}
                  {/* 多图指示器 */}
                  {product.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                      📷 {product.images.length}张
                    </div>
                  )}
                  {/* 缩略图预览 */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                      {product.images.slice(0, 4).map((image, index) => (
                        <button
                          key={index}
                          className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white/50 hover:border-[#FFA500] transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageModal(product.images, index);
                          }}
                        >
                          <img
                            src={image}
                            alt={`${product.name} 图片${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                      {product.images.length > 4 && (
                        <div className="w-12 h-12 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white text-xs font-medium border-2 border-white/50">
                          +{product.images.length - 4}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div 
                    className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    onClick={() => onSelectProduct(product)}
                    style={{ cursor: 'pointer' }}
                  >
                    <button className="w-full py-3 bg-white/90 backdrop-blur-sm text-[#FFA500] rounded-xl font-semibold hover:bg-white transition-colors">
                      查看详情
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-[#FFA500]/10 text-[#FF8C00] px-3 py-1 rounded-full font-medium">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#FFA500] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#FFA500]">{product.price}</span>
                    <button className="text-gray-400 hover:text-[#FFA500] transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">暂无产品</h3>
            <p className="text-gray-500">该分类下暂无产品，请选择其他分类</p>
          </div>
        )}
      </div>
    </div>
  );
}