'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building } from '@/data/buildingsData';
import { YANDEX_API_KEY, DEFAULT_CENTER } from '@/config/yandexmaps';

interface YandexMapProps {
  buildings: Building[];
}

export default function YandexMap({ buildings }: YandexMapProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [mapUrl, setMapUrl] = useState<string>('');
  const [mapSize, setMapSize] = useState({ width: 800, height: 600 });
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Обрабатываем изменение размера экрана
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 40, 800);
      const height = Math.round(width * 0.75); // Соотношение сторон 4:3
      setMapSize({ width, height });
    };

    handleResize(); // Инициализация размера
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Формируем URL для Static API Яндекс.Карт
    const center = selectedBuilding?.coordinates 
      ? `${selectedBuilding.coordinates[0]},${selectedBuilding.coordinates[1]}` 
      : `${DEFAULT_CENTER.longitude},${DEFAULT_CENTER.latitude}`;
    
    const zoom = selectedBuilding ? 16 : DEFAULT_CENTER.zoom;
    
    // Формируем маркеры для зданий
    const markers = buildings
      .filter(building => building.coordinates !== undefined)
      .map(building => {
        const isSelected = selectedBuilding?.id === building.id;
        // Используем разные типы меток для выбранного и обычных зданий
        const markerType = isSelected ? 'pm2rdm' : 'pm2blm';
        return `${markerType}${building.number}~${building.coordinates![0]},${building.coordinates![1]}`;
      })
      .join('~');
    
    // Создаем URL для Static API Яндекс.Карт
    const url = `https://static-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&l=map&ll=${center}&z=${zoom}&size=${mapSize.width},${mapSize.height}&pt=${markers}`;
    
    setMapUrl(url);
  }, [buildings, selectedBuilding, mapSize]);

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building === selectedBuilding ? null : building);
  };

  const handleImageError = () => {
    console.error('Ошибка загрузки карты. Возможно, API-ключ недействителен.');
    setMapError(true);
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
      {mapUrl && !mapError ? (
        <div className="relative" style={{ width: mapSize.width, height: mapSize.height, margin: '0 auto' }}>
          <Image 
            src={mapUrl} 
            alt="Карта Литейного проспекта" 
            width={mapSize.width} 
            height={mapSize.height}
            className="w-full h-auto"
            priority
            onError={handleImageError}
          />
        </div>
      ) : mapError ? (
        <div 
          className="flex flex-col items-center justify-center bg-gray-100" 
          style={{ width: mapSize.width, height: mapSize.height, margin: '0 auto' }}
        >
          <div className="text-center p-8">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-gray-400 mb-4 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Не удалось загрузить карту</h3>
            <p className="text-gray-600">
              Возможно, API-ключ Яндекс Карт недействителен или превышены лимиты запросов.
            </p>
          </div>
        </div>
      ) : null}
      
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Выберите здание:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {buildings.map(building => (
              <button
                key={building.id}
                onClick={() => handleBuildingClick(building)}
                className={`px-3 py-2 text-sm rounded-md transition-all ${
                  selectedBuilding?.id === building.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                №{building.number}
              </button>
            ))}
          </div>
        </div>
        
        {selectedBuilding && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-serif font-bold text-lg text-primary-700">{selectedBuilding.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{selectedBuilding.address}</p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 text-sm">
              <p className="mt-1">
                <span className="font-semibold">Год постройки:</span> {selectedBuilding.buildYear}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Архитектор:</span> {selectedBuilding.architect}
              </p>
            </div>
            <p className="text-sm mt-2">
              <span className="font-semibold">Стиль:</span> {selectedBuilding.style}
            </p>
            <Link
              href={`/buildings/${selectedBuilding.id}`}
              className="text-sm text-primary-600 font-semibold mt-3 inline-block hover:text-primary-800"
            >
              Подробнее →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 