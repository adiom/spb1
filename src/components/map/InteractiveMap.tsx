'use client';

import { useState, useRef, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import { Building } from '@/data/buildingsData';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { MAPBOX_TOKEN, MAPBOX_STYLE, DEFAULT_CENTER } from '@/config/mapbox';

interface InteractiveMapProps {
  buildings: Building[];
}

export default function InteractiveMap({ buildings }: InteractiveMapProps) {
  const mapRef = useRef(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [viewState, setViewState] = useState(DEFAULT_CENTER);

  useEffect(() => {
    if (selectedBuilding && selectedBuilding.coordinates) {
      setViewState({
        ...viewState,
        longitude: selectedBuilding.coordinates[0],
        latitude: selectedBuilding.coordinates[1],
        zoom: 16
      });
    }
  }, [selectedBuilding]);

  const handleMarkerClick = (building: Building) => {
    setSelectedBuilding(building);
  };

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <Map
        ref={mapRef}
        mapStyle={MAPBOX_STYLE}
        mapboxAccessToken={MAPBOX_TOKEN}
        longitude={viewState.longitude}
        latitude={viewState.latitude}
        zoom={viewState.zoom}
        onMove={evt => setViewState(evt.viewState)}
        reuseMaps
      >
        <NavigationControl position="top-right" />
        
        {buildings.map((building) => (
          building.coordinates && (
            <Marker
              key={building.id}
              longitude={building.coordinates[0]}
              latitude={building.coordinates[1]}
              anchor="bottom"
              onClick={e => {
                e.originalEvent.stopPropagation();
                handleMarkerClick(building);
              }}
            >
              <div className="cursor-pointer">
                <div className="bg-primary-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {building.number}
                </div>
              </div>
            </Marker>
          )
        ))}
        
        {selectedBuilding && selectedBuilding.coordinates && (
          <Popup
            longitude={selectedBuilding.coordinates[0]}
            latitude={selectedBuilding.coordinates[1]}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelectedBuilding(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-serif font-bold text-sm text-primary-700">{selectedBuilding.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{selectedBuilding.address}</p>
              <p className="text-xs mt-1">
                <span className="font-semibold">Год постройки:</span> {selectedBuilding.buildYear}
              </p>
              <p className="text-xs mt-1">
                <span className="font-semibold">Архитектор:</span> {selectedBuilding.architect}
              </p>
              <Link
                href={`/buildings/${selectedBuilding.id}`}
                className="text-xs text-primary-600 font-semibold mt-2 inline-block hover:text-primary-800"
              >
                Подробнее →
              </Link>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
} 