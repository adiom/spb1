'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TimelineEvent } from '@/data/timelineData';

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
}

export function TimelineItem({ event, index }: TimelineItemProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="timeline-item"
    >
      <div className="timeline-dot" />
      <div className="bg-white rounded-lg shadow-md p-6 my-4">
        <h3 className="text-xl font-serif font-bold text-primary-700">{event.year}</h3>
        <h4 className="font-bold text-lg mb-2">{event.title}</h4>
        <p className="text-gray-700 mb-3">{event.description}</p>
        <p className="text-sm text-primary-600 italic">{event.significance}</p>
      </div>
    </motion.div>
  );
}

interface TimelineSectionProps {
  events: TimelineEvent[];
  title?: string;
  description?: string;
}

export default function TimelineSection({ 
  events, 
  title = 'Хронология событий',
  description = 'Важные даты в истории Литейного проспекта'
}: TimelineSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Эффект параллакса при прокрутке
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-primary-50 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-primary-700">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="relative pl-8">
          <div className="absolute left-0 inset-y-0 border-l-2 border-primary-600" />
          
          <div className="space-y-12">
            {events.map((event, index) => (
              <TimelineItem key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 