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

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  openImageModal: (images: string[], index: number) => void;
}

export default function ProductDetailPage({ product, onBack, openImageModal }: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#FFA500] transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          返回产品列表
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden">
              <img
                src={product.images[currentImageIndex] || '/products/wooden/animal/21.webp'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <span className="text-2xl">‹</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <span className="text-2xl">›</span>
                  </button>
                </>
              )}
              <button
                onClick={() => openImageModal(product.images, currentImageIndex)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-white transition-colors"
              >
                🔍 放大查看
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-[#FFA500] ring-2 ring-[#FFA500]/20'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white px-4 py-2 rounded-full text-sm font-semibold">
                {product.category}
              </span>
              {product.hot && (
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  🔥 热销
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              {product.name}
            </h1>

            <div className="text-4xl font-black text-[#FFA500] mb-6">
              {product.price}
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.desc}
            </p>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4">产品参数</h3>
              <div className="space-y-3">
                {product.material && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-500">材质</span>
                    <span className="font-medium text-gray-900">{product.material}</span>
                  </div>
                )}
                {product.size && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-500">尺寸</span>
                    <span className="font-medium text-gray-900">{product.size}</span>
                  </div>
                )}
                {product.age && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500">适用年龄</span>
                    <span className="font-medium text-gray-900">{product.age}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-[0_10px_30px_rgba(255,165,0,0.4)] transition-all hover:scale-[1.02]">
                📞 立即咨询
              </button>
              <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors">
                📋 获取报价
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}