'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.section 
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ scale, opacity }}
    >
      {/* Фоновое изображение */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 to-black/70"
        style={{ y }}
      >
        <div 
          className="absolute inset-0 bg-center bg-cover" 
          style={{ 
            backgroundImage: "url('/images/spb-bg.jpg')",
            backgroundPosition: 'center',
            filter: 'grayscale(30%)'
          }}
        />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}  
          className="hero-text text-white mb-6 drop-shadow-lg"
        >
          Литейный проспект<br />
          <span className="text-xl md:text-2xl lg:text-3xl font-light">
            Историко-архитектурное исследование
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md"
        >
          Путешествие сквозь века по одной из самых знаковых улиц Санкт-Петербурга — 
          от Литейного двора эпохи Петра I до современности
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link 
            href="/history" 
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Начать исследование
          </Link>
          <Link 
            href="/buildings" 
            className="bg-white hover:bg-gray-100 text-primary-700 font-medium py-3 px-6 rounded-md transition-colors"
          >
            Исторические здания
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 h-3 bg-white rounded-full" 
            animate={{ 
              y: [0, 8, 0],  
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
} 