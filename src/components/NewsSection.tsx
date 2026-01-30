import React, { useState, useEffect } from 'react';
import type { NewsItem } from '../types';
import { NEWS } from '../constants';
import { FadeIn } from './FadeIn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsApiResponse {
  date: string;
  subject: string;
  content: string;
}

const CACHE_KEY = 'kaffa_news_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      // 1. Check Cache
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const now = Date.now();
          
          if (now - timestamp < CACHE_DURATION) {
            if (isMounted) {
              setNews(data);
              setLoading(false);
            }
            // If cache is valid, return early and skip network request
            return;
          }
        }
      } catch (e) {
        console.warn('Failed to parse news cache', e);
        localStorage.removeItem(CACHE_KEY);
      }

      // 2. Fetch from Network if cache missed or expired
      try {
        const response = await fetch('https://tawei-n8n.zeabur.app/webhook/ece60dcc-d7a9-4d99-bd6c-70c70695084c');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: NewsApiResponse[] = await response.json();
        
        if (isMounted) {
          const formattedNews: NewsItem[] = data.map((item, index) => ({
            id: `news-${index}`,
            date: item.date.replace(/-/g, '.'), 
            title: item.subject,
            content: item.content
          }));
          
          setNews(formattedNews);

          // 3. Save to Cache
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              data: formattedNews,
              timestamp: Date.now()
            }));
          } catch (e) {
            console.warn('Failed to save news to cache', e);
          }
        }
      } catch (error) {
        console.warn('Error loading news, falling back to static data:', error);
        if (isMounted) {
          setNews(NEWS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <section id="news" className="py-24 bg-white border-b border-gray-100">
       <div className="container mx-auto px-6 md:px-12 lg:px-48">
        <FadeIn>
          <div className="mb-16 text-center">
             <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-2">News</h3>
             <div className="w-8 h-[1px] bg-black mx-auto"></div>
          </div>
        </FadeIn>

        {loading ? (
          <div className="text-center py-12">
            <span className="text-xs font-mono text-gray-400 tracking-widest animate-pulse">LOADING UPDATES...</span>
          </div>
        ) : (
          <FadeIn delay={200}>
            {/* Slider Container */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0 px-1">
                    <div className="space-y-12">
                      {news
                        .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                        .map((item) => (
                          <article key={item.id} className="group flex flex-col md:flex-row gap-4 md:gap-12 items-baseline">
                            <span className="text-xs font-mono text-gray-400 shrink-0 w-32">{item.date}</span>
                            <div className="flex-1">
                              <h4 className="text-lg font-normal mb-2 tracking-wide transition-all">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-500 font-light leading-relaxed">
                                {item.content}
                              </p>
                            </div>
                          </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 space-x-8">
                <button 
                  onClick={handlePrev} 
                  disabled={currentPage === 0}
                  className={`flex items-center space-x-2 p-2 transition-colors duration-300 ${
                    currentPage === 0 ? 'text-gray-200 cursor-not-allowed' : 'text-black hover:text-gray-500'
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
                    currentPage === totalPages - 1 ? 'text-gray-200 cursor-not-allowed' : 'text-black hover:text-gray-500'
                  }`}
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase hidden md:inline">Next</span>
                  <ChevronRight size={16} strokeWidth={1} />
                </button>
              </div>
            )}
          </FadeIn>
        )}
      </div>
    </section>
  );
};
