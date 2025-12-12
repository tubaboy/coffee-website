
export interface MenuItem {
  id: string;
  category: 'Espresso Beverages' | 'Alcoholic Coffee Beverages' | 'Cold Brew Beverages' | 'Exclusive Beverages' | 'Hand Drip' | 'Others' | 'Food';
  name: string;
  nameEn: string;
  price: number;
}

export interface CoffeeBeanSpec {
  weight: string;
  price: string;
}

export interface CoffeeBean {
  id: string;
  name: string;
  nameEn: string;
  roastLevel: string;
  specs: CoffeeBeanSpec[];
  description: string;
  notes: string[];
  imageUrl: string;
  origin: string;
  buyLink: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
}