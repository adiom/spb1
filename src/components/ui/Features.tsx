'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
  index: number;
}

const features = [
  {
    title: 'История проспекта',
    description: 'Узнайте об истории Литейного проспекта, начиная с эпохи Петра I до наших дней.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    link: '/history',
    linkText: 'Изучить историю'
  },
  {
    title: 'Архитектурный анализ',
    description: 'Детальный разбор архитектурных стилей и особенностей знаковых зданий проспекта.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    link: '/buildings',
    linkText: 'Исследовать здания'
  },
  {
    title: 'Хронология событий',
    description: 'Важные даты и события, связанные с Литейным проспектом, представленные в хронологическом порядке.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    link: '/timeline',
    linkText: 'Просмотреть хронологию'
  },
  {
    title: 'Галерея изображений',
    description: 'Коллекция исторических и современных фотографий Литейного проспекта и его зданий.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    link: '/gallery',
    linkText: 'Посмотреть галерею'
  }
];

function Feature({ title, description, icon, link, linkText, index }: FeatureProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="card h-full flex flex-col"
    >
      <div className="rounded-full bg-primary-50 p-3 w-12 h-12 flex items-center justify-center text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <Link 
        href={link} 
        className="mt-2 text-primary-600 font-medium hover:text-primary-800 transition-colors flex items-center"
      >
        {linkText}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </motion.div>
  );
}

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-primary-700">Исследование Литейного проспекта</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Изучите разные аспекты истории и архитектуры одного из самых значимых проспектов Санкт-Петербурга 
            через различные разделы нашего исследования.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
              linkText={feature.linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 