'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { buildings } from '@/data/buildingsData';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';

export default function BuildingDetail() {
  const { id } = useParams();
  const buildingId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined;
  
  const building = buildings.find(b => b.id === buildingId);
  
  if (!building) {
    notFound();
  }
  
  return (
    <MainLayout>
      <article>
        {/* Хедер здания */}
        <div className="bg-primary-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm mb-4">
              <Link href="/buildings" className="text-white/80 hover:text-white flex items-center">
                <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Назад к списку зданий
              </Link>
            </div>
            <h1 className="hero-text mb-2">{building.name}</h1>
            <p className="text-xl">Литейный пр., {building.number}</p>
          </div>
        </div>

        {/* Основная информация */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-4">
                  {/* Заглушка для изображения - в реальном проекте здесь будет фото здания */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                    <span className="text-primary-700 text-lg font-medium">Фото здания</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {building.style}
                  </span>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {building.buildYear} г.
                  </span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-serif font-bold text-primary-700 mb-4">Об этом здании</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Основная информация</h3>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Адрес</dt>
                        <dd className="mt-1 text-gray-900">Литейный пр., {building.number}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Год постройки</dt>
                        <dd className="mt-1 text-gray-900">{building.buildYear}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Архитектор</dt>
                        <dd className="mt-1 text-gray-900">{building.architect}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Архитектурный стиль</dt>
                        <dd className="mt-1 text-gray-900">{building.style}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Описание</h3>
                    <div className="prose prose-primary max-w-none">
                      <p className="text-gray-600">{building.description}</p>
                    </div>
                  </div>
                  
                  {building.historicalFacts && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Исторические факты</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {building.historicalFacts.map((fact: string, index: number) => (
                          <li key={index}>{fact}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {building.famousResidents && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Знаменитые жители</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {building.famousResidents.map((resident: string, index: number) => (
                          <li key={index}>{resident}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Секция - другие здания поблизости */}
        <section className="py-12 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-primary-700 text-center mb-8">Другие здания поблизости</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildings
                .filter(b => b.id !== building.id)
                .slice(0, 3)
                .map((nearbyBuilding, index) => (
                  <motion.div
                    key={nearbyBuilding.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card h-full flex flex-col"
                  >
                    <h3 className="text-lg font-serif font-bold text-primary-700 mb-2">
                      {nearbyBuilding.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">Литейный пр., {nearbyBuilding.number}</p>
                    
                    <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-2">
                      {nearbyBuilding.description}
                    </p>
                    
                    <div className="mt-auto">
                      <Link 
                        href={`/buildings/${nearbyBuilding.id}`}
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
              }
            </div>
          </div>
        </section>
      </article>
    </MainLayout>
  );
} 