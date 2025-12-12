import React from 'react';
import { FadeIn } from './FadeIn';

export const ShopInfo: React.FC = () => {
  return (
    <section id="shop" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[600px]">
        {/* Info Text */}
        <div className="bg-[#1a1a1a] text-white p-12 md:p-24 flex flex-col justify-center">
          <FadeIn>
            <div className="mb-12">
              <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-2 text-white">Location</h3>
              <div className="w-8 h-[1px] bg-white mb-8"></div>
              <p className="text-2xl font-light tracking-widest mb-2">自家屋珈琲焙煎所</p>
              <p className="text-2xl font-light tracking-widest mb-8">KAFFA FOREST COFFEE ROASTERS</p>
              
              <p className="text-sm font-light tracking-wide text-gray-400 mb-1">ADD</p>
              <p className="text-base tracking-wide mb-6">114台北市內湖區內湖路一段437巷4弄2號</p>

              <p className="text-sm font-light tracking-wide text-gray-400 mb-1">TEL</p>
              <p className="text-base tracking-wide mb-6">+886909667106</p>

              <p className="text-sm font-light tracking-wide text-gray-400 mb-1">OPEN</p>
              <p className="text-base tracking-wide font-mono">Mon - Fri 08:30 - 16:00</p>
              <p className="text-base tracking-wide font-mono">Sat 09:00 - 15:00</p>
              <p className="text-xs text-gray-500 tracking-wide mt-1">每週日公休 / Closed on Sunday</p>
            </div>
          </FadeIn>
        </div>

        {/* Map */}
        <div className="w-full h-96 md:h-full bg-gray-200 grayscale">
          <iframe 
            src="https://maps.google.com/maps?q=114%E5%8F%B0%E5%8C%97%E5%B8%82%E5%85%A7%E6%B9%96%E5%8D%80%E5%85%A7%E6%B9%96%E8%B7%AF%E4%B8%80%E6%AE%B5437%E5%B7%B74%E5%BC%842%E8%99%9F&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.2)' }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </section>
  );
};