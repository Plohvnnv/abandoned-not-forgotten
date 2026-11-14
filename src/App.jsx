import React, { useState, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { MISSIONS } from './data/missions';
import {
  Radio,
  MapPin,
  ShieldAlert,
  Database,
  X,
  Zap,
  Award,
  ArrowRight,
  Globe2,
  Rocket,
  ChevronLeft,
  Compass,
  Satellite,
  Sparkles,
  ChevronDown,
  Telescope,
  Camera
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'moon' | 'mars'
  const [selectedMission, setSelectedMission] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const globeRef = useRef();
  const sectorsRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moonMissions = MISSIONS.filter((m) => m.planet === 'moon');
  const marsMissions = MISSIONS.filter((m) => m.planet === 'mars');
  const currentMissions = currentView === 'moon' ? moonMissions : marsMissions;

  const handleSelectMission = (mission) => {
    setImgError(false);
    setSelectedMission(mission);
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: mission.lat, lng: mission.lng, altitude: 1.25 },
        1400
      );
    }
  };

  useEffect(() => {
    setSelectedMission(null);
    setImgError(false);
    if (globeRef.current && currentView !== 'home') {
      globeRef.current.pointOfView({ lat: 10, lng: 20, altitude: 2.2 }, 1000);
    }
  }, [currentView]);

  const scrollToSectors = () => {
    sectorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const themeColor = currentView === 'moon' ? 'text-cyan-400' : 'text-amber-400';
  const borderTheme = currentView === 'moon' ? 'border-cyan-500/40' : 'border-amber-500/40';
  const bgGlow = currentView === 'moon' ? 'bg-cyan-500/10' : 'bg-amber-500/10';

  const moonTexture = 'https://threejs.org/examples/textures/planets/moon_1024.jpg';
  const marsTexture = '/mars.jpg';

  const milestones = [
    {
      year: '1969',
      planet: 'ЛУНА',
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/50',
      title: 'База Транквилити и первые шаги',
      desc: 'Посадочная ступень модуля «Орёл» (Apollo 11) и первый лазерный отражатель остались в Море Спокойствия как точка отсчёта пилотируемой космонавтики.'
    },
    {
      year: '1970',
      planet: 'ЛУНА',
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/50',
      title: 'Первый планетоход в истории',
      desc: 'Автоматический «Луноход-1» преодолел более 10 км по Море Дождей, передав десятки тысяч снимков и доказав возможность дистанционного вождения на другом небесном теле.'
    },
    {
      year: '1997',
      planet: 'МАРС',
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/50',
      title: 'Революция мобильных роверов',
      desc: 'Крошечный 10-килограммовый Sojourner съехал с платформы Pathfinder и впервые провёл химический анализ марсианских камней за пределами места посадки.'
    },
    {
      year: '2004–2018',
      planet: 'МАРС',
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/50',
      title: 'Марафон длиной в 14 лет',
      desc: 'Рассчитанный всего на 90 солов Opportunity проработал 5 111 марсианских суток и проехал 45,16 км, навсегда изменив представления о воде на древнем Марсе.'
    },
    {
      year: '2021',
      planet: 'МАРС',
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/50',
      title: 'Первый полёт в чужой атмосфере',
      desc: 'Дрон-вертолёт Ingenuity совершил 72 автономных вылета в разреженной атмосфере Марса, став разведчиком для ровера Perseverance в кратере Езеро.'
    }
  ];

  // --- ЭКРАН 1: ГЛАВНАЯ СТРАНИЦА ---
  if (currentView === 'home') {
    return (
      <div className="relative w-full min-h-screen bg-[#020408] text-slate-100 overflow-x-hidden font-mono select-none">
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4 bg-[#020408]/60 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Satellite className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] text-cyan-400 uppercase font-bold block">
                NASA Space Apps 2026
              </span>
              <span className="text-xs font-bold tracking-wider text-white">
                ABANDONED, NOT FORGOTTEN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 text-xs font-sans text-slate-300 bg-black/50 px-4 py-2 rounded-full border border-white/10">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Orbital Telemetry Synced
              </span>
            </div>
            <button
              onClick={scrollToSectors}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/15 transition cursor-pointer"
            >
              Секторы
            </button>
          </div>
        </header>

        {/* HERO СЕКЦИЯ */}
        <section className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none"
          >
            <source src="/earth.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-[#020408]/90 via-[#020408]/50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-[#020408]/60 pointer-events-none"></div>

          <div className="relative z-10 max-w-6xl mx-auto w-full my-auto">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs mb-6 shadow-xl">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-sans font-medium tracking-wide">
                  Интерактивный 3D-архив космического наследия
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase text-white mb-6 leading-[0.95]">
                Abandoned, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
                  Not Forgotten
                </span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg font-sans leading-relaxed mb-10 bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                От первых шагов на Луне до автономных лабораторий в кратерах Марса. 
                Мы сохраняем точную телеметрию, координаты и историю каждого аппарата, 
                оставшегося на поверхности других миров.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentView('moon')}
                  className="px-8 py-4 rounded-2xl bg-cyan-400 text-slate-950 font-bold text-xs tracking-widest uppercase hover:bg-cyan-300 transition-all shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <Globe2 className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  <span>Исследовать Луну</span>
                </button>
                <button
                  onClick={() => setCurrentView('mars')}
                  className="px-8 py-4 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs tracking-widest uppercase hover:bg-amber-300 transition-all shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <Rocket className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  <span>Исследовать Марс</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex justify-center">
            <button
              onClick={scrollToSectors}
              className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.25em] text-slate-400 hover:text-white transition cursor-pointer"
            >
              <span>Обзор секторов</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
            </button>
          </div>
        </section>

        {/* СЕКЦИЯ 2: ПОРТАЛЫ ПЛАНЕТ */}
        <section ref={sectorsRef} className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold block mb-2">
                Планетарные архивы
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-sans">
                Выберите небесное тело
              </h2>
            </div>
            <p className="text-sm text-slate-400 font-sans max-w-md">
              Нажмите на интересующий сектор, чтобы открыть интерактивный 3D-глобус с точками посадки и телеметрией миссий.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => setCurrentView('moon')}
              className="group relative bg-gradient-to-b from-slate-900/70 to-[#040811] border border-white/10 hover:border-cyan-400/60 rounded-3xl p-8 sm:p-10 cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[440px]"
            >
              <div className="absolute -right-10 -top-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500 pointer-events-none"></div>

              <div className="relative flex justify-center items-center my-2">
                <img
                  src="/moon-card.jpg"
                  alt="Луна"
                  className="w-52 h-52 sm:w-60 sm:h-60 object-contain mix-blend-screen group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                    Сектор 01 // Луна
                  </span>
                  <span className="text-xs text-slate-400">{moonMissions.length} объектов</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 font-sans">
                  Лунное наследие
                </h3>
                <p className="text-slate-300 text-sm font-sans leading-relaxed mb-6">
                  Посадочные ступени миссий Apollo (11–17), действующие лазерные отражатели, станция Surveyor 3 и Луноход-1.
                </p>
                <div className="inline-flex items-center gap-3 text-xs font-bold text-cyan-400 group-hover:translate-x-2 transition-transform">
                  <span>Открыть 3D-глобус Луны</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div
              onClick={() => setCurrentView('mars')}
              className="group relative bg-gradient-to-b from-slate-900/70 to-[#040811] border border-white/10 hover:border-amber-400/60 rounded-3xl p-8 sm:p-10 cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[440px]"
            >
              <div className="absolute -right-10 -top-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-500 pointer-events-none"></div>

              <div className="relative flex justify-center items-center my-2">
                <img
                  src="/mars-card.jpg"
                  alt="Марс"
                  className="w-52 h-52 sm:w-60 sm:h-60 object-contain mix-blend-screen group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700"
                />
              </div>

              <div className="relative z-10 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/30">
                    Сектор 02 // Марс
                  </span>
                  <span className="text-xs text-slate-400">{marsMissions.length} объектов</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 font-sans">
                  Марсианские форпосты
                </h3>
                <p className="text-slate-300 text-sm font-sans leading-relaxed mb-6">
                  Марсоходы Sojourner, Spirit, марафонец Opportunity, Curiosity, станция InSight, Perseverance и вертолёт Ingenuity.
                </p>
                <div className="inline-flex items-center gap-3 text-xs font-bold text-amber-400 group-hover:translate-x-2 transition-transform">
                  <span>Открыть 3D-глобус Марса</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ 3: НАСЛЕДИЕ В ЦИФРАХ */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/10">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-bold block mb-2">
              Масштаб присутствия
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Человечество за пределами Земли в цифрах
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10">
              <div className="text-4xl sm:text-5xl font-black text-cyan-400 font-sans mb-3">
                57+ лет
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Лазерные маяки Луны
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Уголковые отражатели миссий Apollo до сих пор принимают лазерные импульсы с Земли, помогая измерять удаление Луны на 3,8 см в год.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10">
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-sans mb-3">
                45,16 км
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Внеземной марафон
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Дистанция, которую преодолел марсоход Opportunity по кратерам Марса — превысив расчётную норму более чем в 45 раз.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10">
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-sans mb-3">
                ~200 т
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Артефакты на Луне
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Общая масса посадочных платформ, роверов, сейсмометров и научных приборов, покоящихся в вакууме без коррозии и ветра.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10">
              <div className="text-4xl sm:text-5xl font-black text-sky-400 font-sans mb-3">
                72 вылета
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Авиация на Марсе
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Дрон Ingenuity совершил 72 полёта в атмосфере плотностью 1% от земной, хотя проектировался всего для 5 тестовых подъёмов.
              </p>
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ 4: ХРОНОЛОГИЯ */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold block mb-2">
                Летопись исследований
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
                Ключевые вехи космической археологии
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-sans max-w-md">
              Каждый аппарат в нашей базе — это замороженный во времени момент инженерного прорыва своей эпохи.
            </p>
          </div>

          <div className="space-y-4">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="group p-6 sm:p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="flex items-center gap-4 md:w-56 shrink-0">
                  <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                    {item.year}
                  </span>
                  <span className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full border ${item.color}`}>
                    {item.planet}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white font-sans mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* СЕКЦИЯ 5: ТРИ ПРИНЦИПА */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-bold block mb-2">
              Концепция миссии
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Почему «заброшенные» не значит «забытые»
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-3 font-sans">Точная телеметрия</h4>
              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Координаты аппаратов сведены по данным орбитальных камер LROC и архивов NASA Planetary Data System — вы видите реальное положение каждого объекта на сфере.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 w-fit mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-3 font-sans">Охрана наследия</h4>
              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                С возвращением человека на Луну по программе Artemis сохранение исторических зон посадки становится критически важным для будущих экспедиций.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-3 font-sans">План против реальности</h4>
              <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Для каждой миссии мы показываем контраст между скромными инженерными расчётами на старте и невероятными рекордами выживания в космосе.
              </p>
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ 6: НАУЧНЫЕ ИСТОЧНИКИ */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-amber-950/40 border border-white/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3">
                <Telescope className="w-4 h-4" />
                <span>Открытые данные NASA</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-sans mb-3">
                Готовы изучить координаты на 3D-глобусе?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                В базе использованы координаты Lunar Reconnaissance Orbiter Camera (LROC), Mars Reconnaissance Orbiter (HiRISE) и архивы NASA PDS.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setCurrentView('moon')}
                className="px-6 py-4 rounded-2xl bg-cyan-400 text-slate-950 font-bold text-xs tracking-widest uppercase hover:bg-cyan-300 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Globe2 className="w-4 h-4" />
                <span>Сектор Луны</span>
              </button>
              <button
                onClick={() => setCurrentView('mars')}
                className="px-6 py-4 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs tracking-widest uppercase hover:bg-amber-300 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                <span>Сектор Марса</span>
              </button>
            </div>
          </div>
        </section>

        <footer className="px-8 py-8 bg-[#020408] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <span>NASA Space Apps Challenge 2026 // Abandoned, Not Forgotten</span>
          <span>Архивы данных: NASA PDS, LROC & MRO HiRISE</span>
        </footer>
      </div>
    );
  }

  // --- ЭКРАН 2 И 3: ИНТЕРАКТИВНЫЙ 3D-ГЛОБУС С РАДАРНЫМИ МЕТКАМИ ---
  return (
    <div className="relative w-full h-screen bg-[#020408] text-slate-100 overflow-hidden font-mono select-none">
      {/* Фиксированная шапка пульта управления */}
      <header className="absolute top-0 left-0 right-0 z-30 h-16 flex items-center justify-between px-6 bg-[#020408]/90 backdrop-blur-xl border-b border-white/10 shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-slate-200 transition border border-white/10 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>На главную</span>
          </button>

          <div className="h-5 w-[1px] bg-white/15 hidden sm:block"></div>

          <div>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-cyan-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>SECTOR: {currentView.toUpperCase()}</span>
            </div>
            <h1 className="text-sm font-bold tracking-wider uppercase text-white">
              Abandoned, <span className={themeColor}>Not Forgotten</span>
            </h1>
          </div>
        </div>

        <div className="flex bg-black/60 p-1 rounded-xl border border-white/10 gap-2">
          <button
            onClick={() => setCurrentView('moon')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-widest transition-all cursor-pointer ${
              currentView === 'moon'
                ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            MOON
          </button>
          <button
            onClick={() => setCurrentView('mars')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold tracking-widest transition-all cursor-pointer ${
              currentView === 'mars'
                ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            MARS
          </button>
        </div>
      </header>

      {/* 3D Глобус с кастомными sci-fi маркерами */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-16">
        <Globe
          ref={globeRef}
          key={currentView}
          width={windowSize.width}
          height={windowSize.height}
          globeImageUrl={currentView === 'moon' ? moonTexture : marsTexture}
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          atmosphereColor={currentView === 'moon' ? '#06b6d4' : '#f59e0b'}
          atmosphereAltitude={currentView === 'moon' ? 0.08 : 0.15}
          htmlElementsData={currentMissions}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.02}
          htmlElement={(d) => {
            const isSelected = selectedMission?.id === d.id;
            const isMoon = currentView === 'moon';
            const mainHex = isMoon ? '#22d3ee' : '#fbbf24';
            const shortName = d.name.split('—')[0].split('(')[0].trim();

            const el = document.createElement('div');
            el.style.cursor = 'pointer';
            el.style.pointerEvents = 'auto';
            el.innerHTML = `
              <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                transform: translate(-12px, -50%);
                transition: all 0.25s ease;
              " class="group">
                <div style="
                  position: relative;
                  width: 24px;
                  height: 24px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <span style="
                    position: absolute;
                    inset: 0;
                    border-radius: 9999px;
                    border: 1.5px solid ${mainHex};
                    opacity: ${isSelected ? '0.9' : '0.45'};
                    transform: scale(${isSelected ? '1.35' : '1'});
                    box-shadow: 0 0 12px ${mainHex};
                  "></span>
                  <span style="
                    width: 8px;
                    height: 8px;
                    border-radius: 9999px;
                    background: ${isSelected ? '#ffffff' : mainHex};
                    box-shadow: 0 0 10px ${mainHex};
                  "></span>
                </div>
                <div style="
                  background: ${isSelected ? mainHex : 'rgba(2, 4, 8, 0.85)'};
                  color: ${isSelected ? '#020408' : '#f8fafc'};
                  border: 1px solid ${isSelected ? mainHex : 'rgba(255,255,255,0.2)'};
                  padding: 3px 8px;
                  border-radius: 6px;
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                  font-size: 10px;
                  font-weight: 700;
                  letter-spacing: 0.05em;
                  white-space: nowrap;
                  backdrop-filter: blur(8px);
                  box-shadow: 0 4px 14px rgba(0,0,0,0.6);
                ">
                  ${shortName}
                </div>
              </div>
            `;
            el.onclick = () => handleSelectMission(d);
            return el;
          }}
        />
      </div>

      {/* Нижняя панель объектов */}
      <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 pointer-events-auto bg-[#020408]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl overflow-x-auto max-w-[85vw]">
          <div className="flex items-center gap-2 px-2 border-r border-white/10 text-xs text-slate-400 uppercase shrink-0">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Объекты ({currentMissions.length}):</span>
          </div>
          {currentMissions.map((m) => (
            <button
              key={m.id}
              onClick={() => handleSelectMission(m)}
              className={`px-3.5 py-2 rounded-xl text-xs tracking-wide transition border shrink-0 cursor-pointer ${
                selectedMission?.id === m.id
                  ? `${bgGlow} ${borderTheme} text-white font-bold shadow-md`
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {m.name.split('—')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Боковая карточка миссии С ФОТОГРАФИЕЙ ОБЪЕКТА */}
      {selectedMission && (
        <aside className="absolute top-20 right-6 bottom-24 w-[90vw] sm:w-[440px] z-30 bg-[#020408]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
          <div>
            {/* Шапка карточки */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded border ${selectedMission.statusColor}`}
                  >
                    {selectedMission.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedMission.year}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white leading-snug">
                  {selectedMission.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMission(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Блок фотографии аппарата (видоискатель NASA) */}
            {selectedMission.image && !imgError ? (
              <div className="relative mt-4 rounded-2xl overflow-hidden border border-white/15 bg-black group">
                <img
                  src={selectedMission.image}
                  alt={selectedMission.name}
                  onError={() => setImgError(true)}
                  className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-black/30 pointer-events-none"></div>
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-slate-300">
                  <Camera className={`w-3 h-3 ${themeColor}`} />
                  <span>ARCHIVE FEED</span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                  <span>{selectedMission.artifactType}</span>
                  <span className={themeColor}>{selectedMission.nasaSource}</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] flex items-center gap-3 text-xs text-slate-400">
                <Camera className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="font-sans">
                  Добавьте файл <code className="text-slate-200">/public/missions/{selectedMission.id}.jpg</code> для отображения снимка миссии.
                </span>
              </div>
            )}

            {/* Координаты */}
            <div className="flex items-center gap-2 text-xs text-cyan-300 mt-3 bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/20">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="font-mono text-[11px]">{selectedMission.coordsText}</span>
            </div>

            {/* Описание и детали */}
            <div className="mt-4 space-y-3 text-xs text-slate-300 leading-relaxed">
              <div>
                <span className="text-[10px] uppercase text-slate-500 tracking-widest block mb-1">
                  Overview
                </span>
                <p className="text-slate-200 text-xs sm:text-sm font-sans">
                  {selectedMission.summary}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-500 tracking-widest block mb-1">
                  Historical Context
                </span>
                <p className="text-slate-300 text-xs font-sans leading-relaxed">
                  {selectedMission.story}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Hardware in Simple Words</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  {selectedMission.hardware}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>What We Learned</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  {selectedMission.learned}
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-1">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Planned vs Reality</span>
              </div>
              <p className="text-[11px] text-amber-200/80 leading-relaxed font-sans">
                {selectedMission.plannedVsReality}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
            <span>TYPE: {selectedMission.artifactType}</span>
            <span className={themeColor}>{selectedMission.nasaSource}</span>
          </div>
        </aside>
      )}
    </div>
  );
}