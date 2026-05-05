import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getProducts, getProductById } from '../cloudbase';
import type { ProductDisplay } from '../types';

interface AppContextType {
  products: ProductDisplay[];
  productsLoading: boolean;
  selectedProduct: ProductDisplay | null;
  selectedCategory: string;
  imageModalOpen: boolean;
  selectedImage: string;
  currentImageIndex: number;
  currentImages: string[];
  loadProducts: () => void;
  selectProduct: (product: ProductDisplay) => void;
  clearSelectedProduct: () => void;
  selectCategory: (category: string) => void;
  openImageModal: (images: string[], index?: number) => void;
  closeImageModal: () => void;
  navigateImage: (direction: 'prev' | 'next') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// 默认图片
const DEFAULT_IMAGE = 'https://neeko-copilot.bytedance.net/api/text2image?prompt=children%20playground%20equipment%20product%20photo&size=800x600';

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDisplay | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const loadProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const fetchedProducts = await getProducts();
      const transformedProducts = fetchedProducts.map(product => {
        // 使用真实图片，如果没有则使用默认图片
        const productImages = product.images && Array.isArray(product.images) && product.images.length > 0
          ? product.images
          : [DEFAULT_IMAGE];
        return {
          id: product.id,
          name: product.name || '',
          category: product.category || '',
          images: productImages,
          desc: product.description || '',
          hot: product.hot || false,
          price: product.price ? `¥${product.price.toLocaleString()}` : '',
          material: product.material || '',
          size: product.size || '',
          age: product.age || '',
        };
      });
      setProducts(transformedProducts);
    } catch (error) {
      console.error('获取产品数据失败:', error);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const selectProduct = useCallback(async (product: ProductDisplay) => {
    // 获取完整的产品信息（包括图片）
    const fullProduct = await getProductById(product.id);
    if (fullProduct) {
      setSelectedProduct({
        id: fullProduct.id,
        name: fullProduct.name || '',
        category: fullProduct.category || '',
        images: fullProduct.images || [DEFAULT_IMAGE],
        desc: fullProduct.description || '',
        hot: fullProduct.hot || false,
        price: fullProduct.price ? `¥${fullProduct.price.toLocaleString()}` : '',
        material: fullProduct.material || '',
        size: fullProduct.size || '',
        age: fullProduct.age || '',
      });
    } else {
      setSelectedProduct(product);
    }
  }, []);

  const clearSelectedProduct = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const selectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const openImageModal = useCallback((images: string[], index: number = 0) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setSelectedImage(images[index]);
    setImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setImageModalOpen(false);
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentImageIndex(prev => {
      const newIndex = direction === 'prev' 
        ? (prev - 1 + currentImages.length) % currentImages.length
        : (prev + 1) % currentImages.length;
      setSelectedImage(currentImages[newIndex]);
      return newIndex;
    });
  }, [currentImages]);

  return (
    <AppContext.Provider
      value={{
        products,
        productsLoading,
        selectedProduct,
        selectedCategory,
        imageModalOpen,
        selectedImage,
        currentImageIndex,
        currentImages,
        loadProducts,
        selectProduct,
        clearSelectedProduct,
        selectCategory,
        openImageModal,
        closeImageModal,
        navigateImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}