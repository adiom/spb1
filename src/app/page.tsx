import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/ui/HeroSection';
import Features from '@/components/ui/Features';
import YandexMapJS from '@/components/map/YandexMapJS';
import TimelineSection from '@/components/timeline/TimelineSection';
import { buildings } from '@/data/buildingsData';
import { timelineEvents } from '@/data/timelineData';

export default function Home() {
  // Выбираем только ключевые события для главной страницы
  const featuredEvents = timelineEvents.slice(0, 5);
  
  return (
    <MainLayout>
      {/* Героическая секция */}
      <HeroSection />
      
      {/* Основные разделы сайта */}
      <Features />
      
      {/* Краткая история */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="section-title text-primary-700">О Литейном проспекте</h2>
          </div>
          
          <div className="prose prose-lg mx-auto">
            <p className="mb-4">
              Литейный проспект, одна из важнейших магистралей Центрального района Санкт-Петербурга, представляет собой не просто улицу, а живую летопись городской истории. 
              Простираясь от Невского проспекта до Литейного моста через Неву, этот проспект на протяжении столетий играл ключевую роль в жизни города.
            </p>
            <p className="mb-4">
              Название проспекта, одно из старейших в городе, уходит корнями к началу XVIII века, к эпохе Петра Великого, и связано со строительством на левом берегу Невы Литейного двора, 
              положившего начало российской артиллерии. Здесь отливались пушки и другие орудия для молодого русского флота и армии.
            </p>
            <p>
              Архитектурное разнообразие проспекта, от строгих классических фасадов до изысканных образцов модерна и монументальных сооружений советской эпохи, 
              наглядно иллюстрирует смену стилей и эпох. Каждый дом хранит свою неповторимую историю, которая в совокупности составляет богатейшее наследие Литейного проспекта.
            </p>
          </div>
        </div>
      </section>
      
      {/* Интерактивная карта */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-primary-700">Исторические здания</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Исследуйте архитектурные памятники Литейного проспекта на интерактивной карте
            </p>
          </div>
          
          <YandexMapJS buildings={buildings} />
        </div>
      </section>
      
      {/* Хронология событий */}
      <TimelineSection 
        events={featuredEvents} 
        title="Ключевые события" 
        description="Некоторые важные даты из истории Литейного проспекта"
      />
    </MainLayout>
  );
}
