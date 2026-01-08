import type { MenuItem, CoffeeBean, NewsItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Espresso Beverages
  { id: 'e1', category: 'Espresso Beverages', name: '濃縮咖啡', nameEn: 'Espresso', price: 50 },
  { id: 'e2', category: 'Espresso Beverages', name: '1+1組合', nameEn: '1+1 Combo', price: 95 },
  { id: 'e3', category: 'Espresso Beverages', name: '美式黑咖啡', nameEn: 'Americano', price: 60 },
  { id: 'e4', category: 'Espresso Beverages', name: '拿鐵', nameEn: 'Coffee Latte', price: 75 },
  { id: 'e5', category: 'Espresso Beverages', name: '卡布奇諾', nameEn: 'Cappuccino', price: 75 },
  { id: 'e6', category: 'Espresso Beverages', name: '馥芮白', nameEn: 'Flat White', price: 75 },
  { id: 'e7', category: 'Espresso Beverages', name: '榛果拿鐵', nameEn: 'Hazelnut Syrup Coffee Latte', price: 85 },
  { id: 'e8', category: 'Espresso Beverages', name: '焦糖拿鐵', nameEn: 'Caramel Syrup Coffee Latte', price: 85 },
  { id: 'e9', category: 'Espresso Beverages', name: '香草拿鐵', nameEn: 'Vanilla Syrup Coffee Latte', price: 85 },
  { id: 'e10', category: 'Espresso Beverages', name: '玫瑰拿鐵', nameEn: 'Rose Syrup Coffee Latte', price: 85 },
  { id: 'e11', category: 'Espresso Beverages', name: '橙香拿鐵', nameEn: 'Triple Sec Syrup Coffee Latte', price: 85 },
  { id: 'e12', category: 'Espresso Beverages', name: '黑糖拿鐵', nameEn: 'Brown Sugar Coffee Latte', price: 85 },
  { id: 'e13', category: 'Espresso Beverages', name: '薄荷拿鐵', nameEn: 'Mint Syrup Coffee Latte', price: 85 },
  { id: 'e14', category: 'Espresso Beverages', name: '杏仁拿鐵', nameEn: 'Almond Syrup Coffee Latte', price: 85 },
  { id: 'e15', category: 'Espresso Beverages', name: '抹茶拿鐵', nameEn: 'Matcha Coffee Latte', price: 85 },
  { id: 'e16', category: 'Espresso Beverages', name: '桂花釀拿鐵', nameEn: 'Osmanthus Syrup Coffee Latte', price: 85 },
  { id: 'e17', category: 'Espresso Beverages', name: '巧克力拿鐵', nameEn: 'Chocolate Coffee Latte', price: 85 },
  { id: 'e18', category: 'Espresso Beverages', name: '太妃糖拿鐵', nameEn: 'Toffee Syrup Coffee Latte', price: 85 },
  { id: 'e19', category: 'Espresso Beverages', name: '提拉米蘇拿鐵', nameEn: 'Tiramisu Syrup Coffee Latte', price: 85 },
  { id: 'e20', category: 'Espresso Beverages', name: '海鹽焦糖拿鐵', nameEn: 'Salt Caramel Syrup Coffee Latte', price: 85 },

  // Alcoholic Coffee Beverages
  { id: 'a1', category: 'Alcoholic Coffee Beverages', name: '貝禮詩奶酒拿鐵', nameEn: 'Baileys Coffee Latte', price: 95 },
  { id: 'a2', category: 'Alcoholic Coffee Beverages', name: '君度橙酒拿鐵', nameEn: 'Cointreau Coffee Latte', price: 95 },
  { id: 'a3', category: 'Alcoholic Coffee Beverages', name: '煙燻威士忌拿鐵', nameEn: "Jack Daniel's Coffee Latte", price: 95 },
  { id: 'a4', category: 'Alcoholic Coffee Beverages', name: '櫻桃巧克力甜酒拿鐵', nameEn: 'Soplica Liqueur Coffee Latte', price: 95 },
  { id: 'a5', category: 'Alcoholic Coffee Beverages', name: '蜂蜜波本威士忌拿鐵', nameEn: 'Honey Bourbon Coffee Latte', price: 95 },
  { id: 'a6', category: 'Alcoholic Coffee Beverages', name: '荔枝酒香拿鐵', nameEn: 'Coffee Latte with Marie Brizard Lychee Liqueurs', price: 95 },
  { id: 'a7', category: 'Alcoholic Coffee Beverages', name: '奶油糖果甜酒拿鐵', nameEn: 'Coffee Latte with De Kuyper Butterscotch Liqueur', price: 95 },

  // Cold Brew Beverages
  { id: 'c1', category: 'Cold Brew Beverages', name: '18小時精釀冷萃', nameEn: 'Cold Brew', price: 90 },
  { id: 'c2', category: 'Cold Brew Beverages', name: '可樂冷萃', nameEn: 'Cold Brew with Coke', price: 90 },
  { id: 'c3', category: 'Cold Brew Beverages', name: '大力冷萃', nameEn: 'Cold Brew with Vitali Vitamin Soda', price: 90 },
  { id: 'c4', category: 'Cold Brew Beverages', name: '凍檸冷萃', nameEn: 'Cold Brew with Homemade Lemon Syrup', price: 100 },
  { id: 'c5', category: 'Cold Brew Beverages', name: '梅酒加咖啡', nameEn: 'Cold Brew with Umeshu', price: 100 },

  // Exclusive Beverages
  { id: 'x1', category: 'Exclusive Beverages', name: '鹹檸七美式', nameEn: 'Salted Lemon with 7up Soda & Espresso', price: 90 },
  { id: 'x2', category: 'Exclusive Beverages', name: '梅子冰美式', nameEn: 'Plum Juice with Espresso', price: 90 },
];

export const COFFEE_BEANS: CoffeeBean[] = [
  {
    id: 'b1',
    name: '晨間喚醒配方',
    nameEn: 'Morning Blend',
    roastLevel: 'Medium',
    specs: [{ weight: '200g', price: '450' }],
    description: '專為早晨設計的配方豆，帶有堅果與焦糖的香氣，口感圓潤，酸度適中，適合搭配牛奶飲用。',
    notes: ['Caramel', 'Nutty', 'Smooth'],
    imageUrl: 'https://picsum.photos/id/1060/800/800',
    origin: 'Brazil / Colombia',
    buyLink: 'https://shopee.tw/kaffaforest'
  },
  {
    id: 'b2',
    name: '衣索比亞 水洗',
    nameEn: 'Ethiopia Washed',
    roastLevel: 'Light',
    specs: [{ weight: '200g', price: '550' }],
    description: '經典的耶加雪菲水洗處理，明亮的檸檬柑橘調性，伴隨著優雅的茉莉花香，口感乾淨清爽。',
    notes: ['Lemon', 'Jasmine', 'Tea-like'],
    imageUrl: 'https://picsum.photos/id/425/800/800',
    origin: 'Ethiopia Yirgacheffe',
    buyLink: 'https://shopee.tw/kaffaforest'
  },
  {
    id: 'b3',
    name: '哥斯大黎加 蜜處理',
    nameEn: 'Costa Rica Honey',
    roastLevel: 'Medium',
    specs: [{ weight: '200g', price: '520' }],
    description: '採用紅蜜處理法，保留了咖啡果實的甜味。入口有豐富的熱帶水果風味，尾韻帶有黑糖甜感。',
    notes: ['Berry', 'Brown Sugar', 'Full Body'],
    imageUrl: 'https://picsum.photos/id/766/800/800',
    origin: 'Costa Rica Tarrazu',
    buyLink: 'https://shopee.tw/kaffaforest'
  },
  {
    id: 'b4',
    name: '深夜低因',
    nameEn: 'Midnight Decaf',
    roastLevel: 'Dark',
    specs: [{ weight: '200g', price: '480' }],
    description: '使用瑞士水洗法去除咖啡因，保留咖啡原始風味。深焙帶來醇厚的黑巧克力苦甜，適合夜晚飲用。',
    notes: ['Dark Chocolate', 'Smoky', 'Spicy'],
    imageUrl: 'https://picsum.photos/id/312/800/800',
    origin: 'Mexico',
    buyLink: 'https://shopee.tw/kaffaforest'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    date: '2023.10.25',
    title: '秋季限定豆款上市',
    content: '隨著天氣轉涼，我們推出了帶有楓糖與肉桂香氣的秋季限定配方，歡迎來店試飲。'
  },
  {
    id: 'n2',
    date: '2023.10.10',
    title: '營業時間調整公告',
    content: '配合店內設備維護，11月份每週二將調整營業時間為 10:00 - 18:00，造成不便敬請見諒。'
  },
  {
    id: 'n3',
    date: '2023.09.28',
    title: '手沖咖啡課程報名中',
    content: '基礎手沖課程將於下週末舉辦，由資深咖啡師親自指導，名額有限，請私訊報名。'
  }
];

export const HERO_IMAGES = [
  '/images/hero_img_1.jpg',
  '/images/hero_img_2.jpg',
  '/images/hero_img_3.jpg',
  '/images/hero_img_4.JPG',
];