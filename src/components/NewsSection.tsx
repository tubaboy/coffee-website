import React, { useState, useEffect } from 'react';
import type { NewsItem } from '../types';
import { NEWS } from '../constants';
import { FadeIn } from './FadeIn';

interface NewsApiResponse {
  date: string;
  subject: string;
  content: string;
}

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const response = await fetch('https://tubaboy.zeabur.app/webhook/ece60dcc-d7a9-4d99-bd6c-70c70695084c');
        
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

  return (
    <section id="news" className="py-24 bg-white border-t border-gray-100">
       <div className="container mx-auto px-6 md:px-12 lg:px-48">
        <FadeIn>
          <div className="mb-16 text-center">
             <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-2">News</h3>
             <div className="w-8 h-[1px] bg-black mx-auto"></div>
          </div>
        </FadeIn>

        <div className="space-y-12">
          {loading ? (
            <div className="text-center py-12">
              <span className="text-xs font-mono text-gray-400 tracking-widest animate-pulse">LOADING UPDATES...</span>
            </div>
          ) : (
            news.map((item, index) => (
              <FadeIn key={item.id} delay={index * 100}>
                <article className="group flex flex-col md:flex-row gap-4 md:gap-12 items-baseline">
                  <span className="text-xs font-mono text-gray-400 shrink-0 w-32">{item.date}</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-normal mb-2 tracking-wide group-hover:underline decoration-1 underline-offset-4 transition-all cursor-pointer">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))
          )}
        </div>
      </div>
    </section>
  );
};