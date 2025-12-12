import React, { useState, useEffect } from 'react';
import type { CoffeeBean } from '../types';
import { COFFEE_BEANS } from '../constants';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface BeanApiResponse {
  cName: string;
  eName: string;
  weightPrice: string;
  roastLevel: string;
  description: string;
  flavor: string;
  origin: string;
  imgLink: string;
  buyLink: string;
}

export const BeansSection: React.FC = () => {
  const [beans, setBeans] = useState<CoffeeBean[]>([]);
  const [selectedBean, setSelectedBean] = useState<CoffeeBean | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    let isMounted = true;

    const fetchBeans = async () => {
      try {
        const response = await fetch('https://tubaboy.zeabur.app/webhook/4e916e75-6b6b-485e-a193-68102a20afde');
        
        if (!response.ok) throw new Error('Failed to fetch beans');
        
        const data: BeanApiResponse[] = await response.json();
        
        if (isMounted) {
          const formattedBeans: CoffeeBean[] = data.map((item, index) => {
            const specs = item.weightPrice.split('|').map(spec => {
              const parts = spec.split('/');
              return {
                weight: parts[0] || spec,
                price: parts[1] || ''
              };
            });

            const notes = item.flavor ? item.flavor.split('|') : [];

            return {
              id: `bean-${index}`,
              name: item.cName,
              nameEn: item.eName,
              roastLevel: item.roastLevel,
              specs: specs,
              description: item.description,
              notes: notes,
              imageUrl: item.imgLink,
              origin: item.origin,
              buyLink: item.buyLink
            };
          });
          setBeans(formattedBeans);
        }
      } catch (error) {
        console.warn('Error loading coffee beans, falling back to static data:', error);
        if (isMounted) {
          setBeans(COFFEE_BEANS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBeans();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.ceil(beans.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <section id="beans" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <FadeIn>
          <div className="mb-16 text-center">
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-2">Coffee Beans</h3>
            <div className="w-8 h-[1px] bg-black mx-auto"></div>
          </div>
        </FadeIn>

        {loading ? (
          <div className="text-center py-12">
             <span className="text-xs font-mono text-gray-400 tracking-widest animate-pulse">LOADING BEANS...</span>
          </div>
        ) : (
          <FadeIn delay={200}>
            {/* Slider Container */}
            <div className="relative overflow-hidden mb-12">
              <div 
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {beans
                        .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                        .map((bean) => (
                          <div 
                            key={bean.id} 
                            className="group cursor-pointer flex flex-col h-full"
                            onClick={() => setSelectedBean(bean)}
                          >
                            <div className="aspect-square w-full overflow-hidden bg-gray-200 mb-6 relative">
                              <img 
                                src={bean.imageUrl} 
                                alt={bean.nameEn} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                              />
                            </div>
                            <div className="text-center mt-auto">
                              <h4 className="text-base font-medium tracking-wide mb-1">{bean.name}</h4>
                              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{bean.nameEn}</p>
                              <div className="flex justify-center items-center space-x-2 text-xs font-mono text-gray-600">
                                {bean.specs[0] && (
                                  <>
                                    <span>{bean.specs[0].weight}</span>
                                    {bean.specs[0].price && (
                                      <>
                                        <span>/</span>
                                        <span>${bean.specs[0].price}</span>
                                      </>
                                    )}
                                  </>
                                )}
                                {bean.specs.length > 1 && <span>...</span>}
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mb-16 space-x-8">
                <button 
                  onClick={handlePrev} 
                  disabled={currentPage === 0}
                  className={`flex items-center space-x-2 p-2 transition-colors duration-300 ${
                    currentPage === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:text-gray-500'
                  }`}
                >
                  <ChevronLeft size={16} strokeWidth={1} />
                  <span className="text-[10px] tracking-[0.2em] uppercase hidden md:inline">Prev</span>
                </button>

                <div className="text-[10px] tracking-[0.2em] text-gray-400 font-mono">
                  {currentPage + 1} <span className="mx-2">/</span> {totalPages}
                </div>

                <button 
                  onClick={handleNext} 
                  disabled={currentPage === totalPages - 1}
                  className={`flex items-center space-x-2 p-2 transition-colors duration-300 ${
                    currentPage === totalPages - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:text-gray-500'
                  }`}
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase hidden md:inline">Next</span>
                  <ChevronRight size={16} strokeWidth={1} />
                </button>
              </div>
            )}

            {/* Online Shop Button */}
            <div className="flex justify-center">
              <a 
                href="https://shopee.tw/kaffaforest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-12 py-3 border border-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-300 inline-flex items-center gap-2"
              >
                Online Shop
                <ExternalLink size={14} />
              </a>
            </div>
          </FadeIn>
        )}
      </div>

      {/* Detail Modal Overlay */}
      {selectedBean && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-white/95 backdrop-blur-sm"
            onClick={() => setSelectedBean(null)}
          ></div>
          
          <div className="relative bg-white w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-fadeIn no-scrollbar">
            <button 
              onClick={() => setSelectedBean(null)}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} strokeWidth={1} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0 group overflow-hidden">
               <img 
                  src={selectedBean.imageUrl} 
                  alt={selectedBean.nameEn} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-left">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 mb-2 uppercase">
                {selectedBean.roastLevel}
              </span>
              <h2 className="text-2xl font-light tracking-wide mb-1">{selectedBean.name}</h2>
              <h3 className="text-sm text-gray-500 tracking-widest uppercase mb-8">{selectedBean.nameEn}</h3>
              
              <div className="w-12 h-[1px] bg-black mb-8"></div>

              <p className="text-sm md:text-base leading-loose font-light text-gray-600 mb-8 text-justify whitespace-pre-wrap">
                {selectedBean.description}
              </p>

              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest block mb-2">Flavor Notes</span>
                <div className="flex flex-wrap gap-2">
                  {selectedBean.notes.map((note, idx) => (
                    <span key={idx} className="text-xs border border-gray-200 px-3 py-1 text-gray-600 tracking-wide">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto border-t border-gray-100 pt-6">
                 <div className="flex flex-col mb-6">
                    <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Origin</span>
                    <span className="text-sm">{selectedBean.origin}</span>
                 </div>

                 {/* Price List */}
                 <div className="mb-8 space-y-2 flex flex-col items-end">
                   {selectedBean.specs.map((spec, idx) => (
                     <div key={idx} className="flex items-center gap-8 text-sm font-mono">
                       <span className="text-gray-600">{spec.weight}</span>
                       <span className="font-bold">${spec.price}</span>
                     </div>
                   ))}
                 </div>

                 {/* Buy Button */}
                 <div className="flex justify-end">
                    <a 
                      href={selectedBean.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto px-16 py-3 bg-black text-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-gray-800 transition-all duration-300 text-center inline-flex items-center justify-center gap-2"
                    >
                      Buy
                      <ExternalLink size={14} />
                    </a>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};