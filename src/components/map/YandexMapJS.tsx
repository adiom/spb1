'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Building } from '@/data/buildingsData';
import { YANDEX_API_KEY, DEFAULT_CENTER } from '@/config/yandexmaps';

interface YandexMapJSProps {
  buildings: Building[];
}

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function YandexMapJS({ buildings }: YandexMapJSProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Инициализация карты после загрузки скрипта
    if (scriptLoaded && !mapInstanceRef.current && mapRef.current) {
      window.ymaps.ready(() => {
        try {
          // Создаем карту
          const map = new window.ymaps.Map(mapRef.current!, {
            center: [DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude],
            zoom: DEFAULT_CENTER.zoom,
            controls: ['zoomControl', 'geolocationControl']
          });

          // Сохраняем экземпляр карты в реф
          mapInstanceRef.current = map;

          // Добавляем маркеры зданий
          buildings.forEach(building => {
            if (building.coordinates) {
              const placemark = new window.ymaps.Placemark(
                [building.coordinates[1], building.coordinates[0]], // Яндекс использует [широта, долгота]
                {
                  iconContent: building.number,
                  balloonContentHeader: building.name,
                  balloonContentBody: `
                    <p>${building.address}</p>
                    <p><strong>Год постройки:</strong> ${building.buildYear}</p>
                    <p><strong>Архитектор:</strong> ${building.architect}</p>
                    <p><strong>Стиль:</strong> ${building.style}</p>
                    <p><a href="/buildings/${building.id}" style="color: #2563EB; font-weight: 500;">Подробнее →</a></p>
                  `
                },
                {
                  preset: 'islands#blueCircleIcon',
                }
              );

              placemark.events.add('click', () => {
                setSelectedBuilding(building);
              });

              map.geoObjects.add(placemark);
            }
          });
        } catch (error) {
          console.error('Ошибка при инициализации карты:', error);
          setScriptError(true);
        }
      });
    }
  }, [buildings, scriptLoaded]);

  useEffect(() => {
    // Обработка изменения выбранного здания
    if (selectedBuilding && selectedBuilding.coordinates && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(
        [selectedBuilding.coordinates[1], selectedBuilding.coordinates[0]], 
        16
      );
    }
  }, [selectedBuilding]);

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building === selectedBuilding ? null : building);
    
    if (building !== selectedBuilding && building.coordinates && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(
        [building.coordinates[1], building.coordinates[0]], 
        16
      );
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`}
        onLoad={() => setScriptLoaded(true)}
        onError={() => setScriptError(true)}
      />
      
      <div 
        ref={mapRef} 
        className="w-full" 
        style={{ height: '600px' }}
      >
        {scriptError && (
          <div className="flex flex-col items-center justify-center bg-gray-100 h-full">
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
        )}
      </div>
      
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