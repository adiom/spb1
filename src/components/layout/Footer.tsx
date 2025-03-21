import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Литейный проспект</h3>
            <p className="text-stone-300 mb-4">
              Историко-архитектурное исследование одного из важнейших проспектов Санкт-Петербурга, 
              отражающее его многовековую историю и архитектурное наследие.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-stone-300 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-stone-300 hover:text-white transition-colors">
                  История
                </Link>
              </li>
              <li>
                <Link href="/buildings" className="text-stone-300 hover:text-white transition-colors">
                  Здания
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-stone-300 hover:text-white transition-colors">
                  Хронология
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  Галерея
                </Link>
              </li>
              <li>
                <Link href="/sources" className="text-stone-300 hover:text-white transition-colors">
                  Источники
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Контакты</h3>
            <p className="text-stone-300 mb-2">
              Санкт-Петербург, Россия
            </p>
            <p className="text-stone-300 mb-4">
              Email: contact@liteiny-spb.ru
            </p>
          </div>
        </div>
        
        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
          <p>© {currentYear} Литейный проспект | Все права защищены</p>
        </div>
      </div>
    </footer>
  );
} 