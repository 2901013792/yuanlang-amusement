import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { AppProvider, useApp } from './contexts/AppContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import CasesPage from './components/CasesPage';
import ServicesPage from './components/ServicesPage';
import NewsPage from './components/NewsPage';
import ContactPage from './components/ContactPage';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
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
    navigateImage
  } = useApp();
  
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, [products.length, loadProducts]);

  const handleSelectProduct = (product: typeof products[0]) => {
    selectProduct(product);
    navigate(`/products/${product.id}`);
  };

  const handleBackToList = () => {
    clearSelectedProduct();
    navigate('/products');
  };

  const handleSelectCategory = (category: string) => {
    selectCategory(category);
    navigate('/products');
  };

  return (
    <div className="min-h-screen">
      <Navigation visible={navVisible} />
      
      <Routes>
        <Route path="/" element={<HomePage onNavigate={navigate} setCategory={handleSelectCategory} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route 
          path="/products" 
          element={
            <ProductsPage 
              products={products} 
              productsLoading={productsLoading}
              onSelectProduct={handleSelectProduct} 
              selectedCategory={selectedCategory} 
              setCategory={handleSelectCategory}
              openImageModal={openImageModal}
            />
          } 
        />
        <Route 
          path="/products/:id" 
          element={
            selectedProduct ? (
              <ProductDetailPage 
                product={selectedProduct} 
                onBack={handleBackToList} 
                openImageModal={openImageModal} 
              />
            ) : (
              <ProductsPage 
                products={products} 
                productsLoading={productsLoading}
                onSelectProduct={handleSelectProduct} 
                selectedCategory={selectedCategory} 
                setCategory={handleSelectCategory} 
                openImageModal={openImageModal}
              />
            )
          } 
        />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      
      <Footer setCategory={handleSelectCategory} />
      
      {/* Image Modal */}
      {imageModalOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <button 
            className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={closeImageModal}
          >
            ×
          </button>
          {currentImages.length > 1 && (
            <>
              <button 
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
              >
                ‹
              </button>
              <button 
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
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
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;