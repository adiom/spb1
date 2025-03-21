'use client';

import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import YandexMapJS from '@/components/map/YandexMapJS';
import { buildings } from '@/data/buildingsData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function BuildingsPage() {
  const [filter, setFilter] = useState('');
  
  // Фильтрация зданий по имени, адресу или архитектору
  const filteredBuildings = filter 
    ? buildings.filter(building => 
        building.name.toLowerCase().includes(filter.toLowerCase()) ||
        building.address.toLowerCase().includes(filter.toLowerCase()) ||
        building.architect.toLowerCase().includes(filter.toLowerCase()) ||
        building.style.toLowerCase().includes(filter.toLowerCase())
      )
    : buildings;
    
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <MainLayout>
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-text mb-6">Исторические здания</h1>
          <p className="text-xl max-w-3xl">
            Архитектурные памятники Литейного проспекта: история, стили и значение
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-primary-700">Интерактивная карта</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Исследуйте расположение исторических зданий на карте Литейного проспекта
            </p>
          </div>
          
          <YandexMapJS buildings={buildings} />
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="section-title text-primary-700">Каталог зданий</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Изучите уникальные архитектурные памятники и узнайте их историю
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Поиск по названию, адресу или архитектору..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBuildings.length > 0 ? (
              filteredBuildings.map((building, index) => (
                <motion.div
                  key={building.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card h-full flex flex-col"
                >
                  <h3 className="text-xl font-serif font-bold text-primary-700 mb-2">
                    {building.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">Литейный пр., {building.number}</p>
                  
                  <div className="flex-grow mb-4">
                    <p className="mb-2">
                      <span className="font-semibold">Год постройки:</span> {building.buildYear}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Архитектор:</span> {building.architect}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Стиль:</span> {building.style}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {building.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <Link 
                      href={`/buildings/${building.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Подробнее
                      <svg className="ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">По вашему запросу зданий не найдено.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 