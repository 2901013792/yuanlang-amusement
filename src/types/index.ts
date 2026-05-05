// 产品类型定义
export interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  imageCount?: number;
  description: string;
  hot: boolean;
  price: number;
  material: string;
  size: string;
  age: string;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

// 产品展示类型（用于列表展示，价格已格式化）
export interface ProductDisplay {
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

// 轮播图类型
export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

// 服务项目类型
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

// 案例类型
export interface Case {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  type: string;
}

// 新闻类型
export interface News {
  id: string;
  title: string;
  image: string;
  summary: string;
  date: string;
  category: string;
}

// 统计数据类型
export interface Stats {
  totalProducts: number;
  totalImages: number;
  totalViews: number;
}

// 导航链接类型
export interface NavLink {
  name: string;
  path: string;
}

// 产品分类类型
export interface ProductCategory {
  id: string;
  name: string;
  icon?: string;
}

// 表单数据类型
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 分页响应类型
export interface PaginationResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}