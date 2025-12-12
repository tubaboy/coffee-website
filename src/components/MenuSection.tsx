import React from 'react';
import { MENU_ITEMS } from '../constants';
import type { MenuItem } from '../types';
import { FadeIn } from './FadeIn';

export const MenuSection: React.FC = () => {
  // Helper to render a category list
  const renderCategory = (category: string) => {
    const items = MENU_ITEMS.filter(item => item.category === category);
    
    // Safety check if category exists or has items
    if (!items || items.length === 0) return null;

    return (
      <div key={category} className="w-full mb-16 last:mb-0">
        <h4 className="text-lg font-medium mb-8 tracking-widest border-b border-gray-100 pb-2">
          {category}
        </h4>
        <ul className="space-y-6">
          {items.map((item: MenuItem) => (
            <li key={item.id} className="flex justify-between items-end group">
              <div className="flex flex-col pr-4">
                <span className="text-base font-light tracking-wide group-hover:text-gray-600 transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] text-gray-400 tracking-wider font-light mt-0.5 uppercase">
                  {item.nameEn}
                </span>
              </div>
              <span className="text-sm font-mono text-gray-800 shrink-0">
                ${item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <FadeIn>
          <div className="mb-16 text-center">
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-2">DRINK Menu</h3>
            <div className="w-8 h-[1px] bg-black mx-auto"></div>
          </div>
        </FadeIn>

        {/* Explicit 3-column Grid Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
          
          {/* Column 1: Espresso Beverages */}
          <FadeIn delay={100} className="flex flex-col">
            {renderCategory('Espresso Beverages')}
          </FadeIn>

          {/* Column 2: Cold Brew & Exclusive */}
          <FadeIn delay={200} className="flex flex-col">
            {renderCategory('Cold Brew Beverages')}
            {renderCategory('Exclusive Beverages')}
          </FadeIn>

          {/* Column 3: Alcoholic Coffee Beverages */}
          <FadeIn delay={300} className="flex flex-col">
            {renderCategory('Alcoholic Coffee Beverages')}
          </FadeIn>

        </div>
      </div>
    </section>
  );
};