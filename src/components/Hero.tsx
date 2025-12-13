import React, { useState, useEffect } from 'react';
import { HERO_IMAGES } from '../constants';

interface HeroImageApiResponse {
  imgUrl: string;
}

const CACHE_KEY = 'kaffa_hero_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const Hero: React.FC = () => {
  const [images, setImages] = useState<string[]>(HERO_IMAGES);
  const [currentImage, setCurrentImage] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch images from webhook with Cache
  useEffect(() => {
    let isMounted = true;

    const fetchImages = async () => {
      // 1. Check Cache
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const now = Date.now();
          
          if (now - timestamp < CACHE_DURATION) {
            if (isMounted && Array.isArray(data) && data.length > 0) {
              setImages(data);
              setCurrentImage(0);
            }
            // If cache is valid, return early and skip network request
            return;
          }
        }
      } catch (e) {
        console.warn('Failed to parse hero images cache', e);
        localStorage.removeItem(CACHE_KEY);
      }

      // 2. Fetch from Network if cache missed or expired
      try {
        const response = await fetch('https://tubaboy.zeabur.app/webhook/05bc2565-e7b7-4b4b-9545-71c069af8096');
        if (!response.ok) throw new Error('Failed to fetch hero images');
        
        const data: HeroImageApiResponse[] = await response.json();
        
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const fetchedUrls = data.map(item => item.imgUrl).filter(url => url);
          
          if (fetchedUrls.length > 0) {
            setImages(fetchedUrls);
            setCurrentImage(0);

            // 3. Save to Cache
            try {
              localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: fetchedUrls,
                timestamp: Date.now()
              }));
            } catch (e) {
              console.warn('Failed to save hero images to cache', e);
            }
          }
        }
      } catch (error) {
        console.warn('Error fetching hero images, using fallback:', error);
        // On error, we just keep the initial HERO_IMAGES state
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, []);

  // Carousel timer
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-gray-50">
      {/* Background Images Container with Parallax Transform */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={src} 
              alt={`Hero ${index}`} 
              className="w-full h-full object-cover grayscale opacity-90"
            />
          </div>
        ))}
      </div>
      
      {/* Optional Overlay Text - kept commented out as per original
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black/10 p-4">
        <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.2em] text-center leading-relaxed drop-shadow-md">
          自家屋珈琲焙煎所
        </h2>
      </div> */}
    </div>
  );
};