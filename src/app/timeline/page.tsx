import MainLayout from '@/components/layout/MainLayout';
import TimelineSection from '@/components/timeline/TimelineSection';
import { timelineEvents } from '@/data/timelineData';

export default function TimelinePage() {
  return (
    <MainLayout>
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-text mb-6">Хронология Литейного проспекта</h1>
          <p className="text-xl max-w-3xl">
            Ключевые события, сформировавшие историю проспекта с XVIII века до наших дней
          </p>
        </div>
      </div>

      <TimelineSection 
        events={timelineEvents} 
        title="Историческая хронология" 
        description="Полная хронология основных событий в истории Литейного проспекта"
      />
    </MainLayout>
  );
} 