import React, { useState, useRef } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { FadeIn } from './FadeIn';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Phone validation: only allow numbers
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setNotification({
        show: true,
        type: 'error',
        message: '請輸入有效的 Email 格式 (Invalid Email Format)'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://tawei-n8n.zeabur.app/webhook/81bedc8f-8630-41d9-b0b9-3df38096027f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      let isSuccess = false;
      if (Array.isArray(data) && data.length > 0) {
        isSuccess = data[0]?.result === 'ok';
      } else if (data && typeof data === 'object') {
        isSuccess = data.result === 'ok';
      }

      if (isSuccess) {
        setNotification({
          show: true,
          type: 'success',
          message: '感謝您的訊息，我們會盡快回覆。'
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
        if (textareaRef.current) {
          textareaRef.current.style.height = '40px';
        }
      } else {
        throw new Error('API returned unsuccessful result');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setNotification({
        show: true,
        type: 'error',
        message: '訊息發送失敗，請稍後再試。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-48 text-center max-w-3xl">
        <FadeIn>
          <div className="mb-16">
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-2">Contact</h3>
            <div className="w-8 h-[1px] bg-black mx-auto"></div>
          </div>
        </FadeIn>

        <form onSubmit={handleSubmit} className="space-y-12 mb-24">
          <FadeIn delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group relative">
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full border-b border-gray-300 py-2 text-center text-sm tracking-widest outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                  disabled={isSubmitting}
                />
              </div>
              <div className="group relative">
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone (Numbers Only)"
                  className="w-full border-b border-gray-300 py-2 text-center text-sm tracking-widest outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="group relative">
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border-b border-gray-300 py-2 text-center text-sm tracking-widest outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                disabled={isSubmitting}
              />
            </div>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="group relative">
              <textarea 
                ref={textareaRef}
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={1}
                className="w-full border-b border-gray-300 py-2 text-center text-sm tracking-widest outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400 resize-none overflow-hidden"
                style={{ minHeight: '40px', whiteSpace: 'pre-wrap' }}
                onInput={handleTextareaInput}
                disabled={isSubmitting}
              />
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-12 py-3 border border-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SENDING...' : 'Send Message'}
            </button>
          </FadeIn>
        </form>

        <FadeIn delay={500}>
          <div className="flex justify-center space-x-12">
              <a href="https://www.instagram.com/kaffaforest/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
                  <div className="p-3 rounded-full border border-gray-100 group-hover:border-black transition-colors">
                      <Instagram size={20} strokeWidth={1.5} />
                  </div>
                  <span className="mt-2 text-[10px] tracking-wider uppercase text-gray-500">Instagram</span>
              </a>
              <a href="https://lin.ee/Fd3kjYj" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
                  <div className="p-3 rounded-full border border-gray-100 group-hover:border-black transition-colors">
                      <MessageCircle size={20} strokeWidth={1.5} />
                  </div>
                  <span className="mt-2 text-[10px] tracking-wider uppercase text-gray-500">Line</span>
              </a>
          </div>
        </FadeIn>
      </div>

      {/* Notification Popup */}
      {notification.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-white/80 backdrop-blur-sm transition-opacity"
            onClick={closeNotification}
          ></div>
          
          <div className="relative bg-white border border-gray-100 p-8 md:p-12 max-w-sm w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center text-center animate-fadeIn">
            <h4 className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 ${notification.type === 'success' ? 'text-black' : 'text-gray-400'}`}>
              {notification.type === 'success' ? 'Message Sent' : 'Error'}
            </h4>
            <div className="w-6 h-[1px] bg-gray-200 mb-6"></div>
            <p className="text-sm font-light leading-relaxed text-gray-600 mb-8">
              {notification.message}
            </p>
            <button 
              onClick={closeNotification}
              className="px-8 py-2 border border-black text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
