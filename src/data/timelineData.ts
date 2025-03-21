export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  significance: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "event-1711",
    year: "1711",
    title: "Основание Литейного Двора",
    description: "По указу Петра I на левом берегу Невы был основан Литейный Двор в районе современного въезда на Литейный мост. Это предприятие стало центром производства пушек и артиллерийского вооружения для нужд армии и флота.",
    significance: "Обозначает происхождение названия проспекта и начало его развития."
  },
  {
    id: "event-1738",
    year: "1738",
    title: "Официальное закрепление названия \"Литейная улица\"",
    description: "Название \"Литейная улица\" было официально закреплено за дорогой, соединявшей Литейный Двор с центром города.",
    significance: "Формальное признание улицы как части городской инфраструктуры."
  },
  {
    id: "event-1770",
    year: "1770",
    title: "Начало регулярной застройки согласно планам Комиссии о строении",
    description: "Началась более организованная застройка проспекта в соответствии с генеральным планом Комиссии о каменном строении Санкт-Петербурга и Москвы.",
    significance: "Обозначает более организованный подход к развитию проспекта."
  },
  {
    id: "event-1774",
    year: "1774",
    title: "Строительство Старого Арсенала",
    description: "На месте современного \"Большого дома\" (Литейный пр., 4) был построен Старый Арсенал по проекту архитектора В.И. Баженова. Это было грандиозное трехэтажное каменное здание, служившее для хранения артиллерийских запасов.",
    significance: "Значительное военное сооружение, позднее ставшее зданием Окружного суда."
  },
  {
    id: "event-1804",
    year: "1804",
    title: "Строительство Особняка князя П.А. Урусова",
    description: "На Литейном проспекте, 9 был построен особняк князя П.А. Урусова, ставший впоследствии известным литературным салоном.",
    significance: "Пример аристократической резиденции начала XIX века, позднее связанный с литературными салонами."
  },
  {
    id: "event-1808",
    year: "1808",
    title: "Строительство Нового Арсенала",
    description: "По проекту Ф.И. Демерцова был построен Новый Арсенал (Литейный пр., 3), имевший восьмиколонный портик и павильоны в виде триумфальных арок по углам.",
    significance: "Крупный военно-промышленный комплекс."
  },
  {
    id: "event-1851-1853",
    year: "1851-1853",
    title: "Строительство казарм Лейб-гвардии",
    description: "На Литейном пр., 1 и 2 были построены симметричные здания в стиле неоренессанс по проекту архитектора А.П. Гемилиана для нужд артиллерийского ведомства.",
    significance: "Симметричная пара зданий, отмечающая въезд на проспект, первоначально военные казармы."
  },
  {
    id: "event-1875-1879",
    year: "1875-1879",
    title: "Строительство Литейного моста",
    description: "Вместо наплавного деревянного моста был построен постоянный чугунный Литейный мост, соединяющий проспект через реку Неву с Выборгской стороной.",
    significance: "Постоянный мост, соединяющий проспект через реку Неву."
  },
  {
    id: "event-1931-1932",
    year: "1931-1932",
    title: "Строительство \"Большого дома\"",
    description: "На месте бывшего Окружного суда (ранее Старого Арсенала) было построено здание в стиле конструктивизм для ОГПУ/НКВД архитекторами Н.А. Троцким, А.И. Гегелло и А.А. Олем.",
    significance: "Печально известное здание для ОГПУ/НКВД/ФСБ."
  },
  {
    id: "event-1944",
    year: "1944",
    title: "Возвращение исторического названия \"Литейный проспект\"",
    description: "После переименований советского периода проспекту было возвращено его историческое название \"Литейный проспект\".",
    significance: "Символическое возвращение к дореволюционному наследию города."
  }
]; 