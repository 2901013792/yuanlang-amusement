import type { Product } from './types';

const BASE_URL = 'http://localhost:3001/api';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products?page=0&pageSize=50`);
    if (!response.ok) {
      console.error('HTTP error:', response.status);
      return [];
    }
    return await response.json();
  } catch (error: any) {
    console.error('查询产品失败:', error.message || error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      console.error('HTTP error:', response.status);
      return null;
    }
    return await response.json();
  } catch (error: any) {
    console.error('查询产品详情失败:', error.message || error);
    return null;
  }
};

export const getCategories = async (): Promise<string[]> => {
  const products = await getProducts();
  const categories = [...new Set(products.map((product: Product) => product.category))];
  return categories;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter((product: Product) => product.category === category);
};