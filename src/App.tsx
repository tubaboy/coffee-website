import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BeansSection } from './components/BeansSection';
import { NewsSection } from './components/NewsSection';
import { ShopInfo } from './components/ShopInfo';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full selection:bg-gray-200">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <NewsSection />
        <BeansSection />
        <MenuSection />
        <ShopInfo />
        <Contact />
      </main>

      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} KAFFA FOREST COFFEE. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;