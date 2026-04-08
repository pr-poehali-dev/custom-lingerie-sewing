import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO = "https://cdn.poehali.dev/projects/81e936f0-1d25-426b-8219-de56b8240daf/files/b26c91b6-427e-41e4-8957-f35dd2142ff6.jpg";
const IMG_ATELIER = "https://cdn.poehali.dev/projects/81e936f0-1d25-426b-8219-de56b8240daf/files/f1b7b7b0-ddac-406d-bb42-0eb24c225815.jpg";
const IMG_CRAFT = "https://cdn.poehali.dev/projects/81e936f0-1d25-426b-8219-de56b8240daf/files/a4a16481-b89c-4499-996d-c4ae71d41e7a.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
     
  }, [threshold]);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

const LaceRow = () => (
  <div className="lace-divider w-full my-8 opacity-60" />
);

const FloralDivider = () => (
  <div className="flex items-center gap-3 justify-center my-6">
    <div className="h-px w-16 bg-dusty-rose/50" />
    <span className="text-dusty-rose text-lg">✿</span>
    <div className="h-px w-16 bg-dusty-rose/50" />
  </div>
);

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    bust: "", underBust: "", waist: "", hips: "",
    hipHeight: "", thigh: "", torsoLength: "",
    notes: "", product: ""
  });
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const navLinks = [
    { id: "hero", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "process", label: "Процесс" },
    { id: "about", label: "О нас" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const handleMeasureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const collections = [
    {
      name: "Классика",
      desc: "Невесомые комплекты из тончайшего хлопка и кружева для ежедневного изящества",
      icon: "Heart",
      color: "bg-petal",
    },
    {
      name: "Романтика",
      desc: "Кружевные боди и комплекты для особых вечеров — для тех, кто ценит настоящую нежность",
      icon: "Sparkles",
      color: "bg-blush/50",
    },
    {
      name: "Boudoir",
      desc: "Шёлковые пеньюары, пояса и корсеты — для будуара вашей мечты",
      icon: "Star",
      color: "bg-cream",
    },
    {
      name: "Bridal",
      desc: "Свадебные комплекты: нежные, воздушные, созданные для самого важного дня",
      icon: "Crown",
      color: "bg-petal",
    },
    {
      name: "Комфорт",
      desc: "Мягкие бесшовные модели без косточек — красота и удобство каждый день",
      icon: "Leaf",
      color: "bg-blush/40",
    },
    {
      name: "Plus Size",
      desc: "Все модели создаются строго по вашим меркам — нет ни одного стандартного размера",
      icon: "Rainbow",
      color: "bg-cream",
    },
  ];

  const processSteps = [
    { num: "01", title: "Заявка", desc: "Заполняете форму на сайте или пишете нам — мы свяжемся в течение часа" },
    { num: "02", title: "Мерки", desc: "Используете нашу онлайн-форму или приходите в ателье для снятия мерок" },
    { num: "03", title: "Эскиз", desc: "Вместе выбираем ткани, кружево и фасон — создаём вашу уникальную модель" },
    { num: "04", title: "Пошив", desc: "Мастер вручную создаёт изделие — от 7 до 14 дней в зависимости от сложности" },
    { num: "05", title: "Примерка", desc: "Примерка и финальные поправки — до идеальной посадки" },
    { num: "06", title: "Готово", desc: "Получаете изделие в красивой подарочной упаковке с ленточкой" },
  ];

  const testimonials = [
    {
      name: "Анастасия К.",
      text: "Заказала свадебный комплект — это было лучшее решение в моей жизни. Всё идеально сидело, муж был в восторге!",
      city: "Москва",
    },
    {
      name: "Ирина М.",
      text: "Наконец-то нашла мастера, который понимает, что такое «идеальная посадка». Уже третий заказ, и каждый раз шедевр.",
      city: "Санкт-Петербург",
    },
    {
      name: "Татьяна В.",
      text: "Мягкая ткань, нежнейшее кружево, чувствую себя принцессой. Спасибо за внимание к каждой детали!",
      city: "Казань",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "hsl(350, 30%, 98%)" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-cormorant text-2xl font-light tracking-widest text-deep-rose hover:opacity-80 transition-opacity">
            La Belle
          </button>
          <div className="hidden md:flex gap-8">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`font-montserrat text-xs tracking-widest uppercase transition-colors hover:text-primary ${activeNav === l.id ? "text-primary border-b border-primary" : "text-muted-foreground"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-foreground" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="font-montserrat text-xs tracking-widest uppercase text-left text-foreground hover:text-primary">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${IMG_HERO})` }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, hsl(350,55%,88%) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, hsl(38,60%,92%) 0%, transparent 50%)",
          }}
        />
        <div className="absolute top-24 right-[10%] w-48 h-48 rounded-full border border-dusty-rose/20 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-32 left-[8%] w-32 h-32 rounded-full border border-dusty-rose/15 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 left-[5%] w-20 h-20 rounded-full bg-blush/20 animate-float" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="animate-fade-up opacity-0 delay-100 font-montserrat text-xs tracking-[0.3em] uppercase text-dusty-rose mb-6">
            Ателье нижнего белья ✦ ручная работа
          </p>
          <h1 className="animate-fade-up opacity-0 delay-200 font-cormorant text-6xl md:text-8xl font-light text-foreground leading-tight mb-6">
            Создано<br />
            <em className="text-deep-rose font-light">для Вас</em>
          </h1>
          <p className="animate-fade-up opacity-0 delay-300 font-montserrat text-sm text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            Каждое изделие — это история вашей красоты, рассказанная нежным кружевом и тончайшими тканями по вашим уникальным меркам
          </p>
          <div className="animate-fade-up opacity-0 delay-400 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("measure-form")}
              className="px-8 py-3 bg-primary text-primary-foreground font-montserrat text-xs tracking-widest uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 rounded-full"
            >
              Снять мерки
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="px-8 py-3 border border-dusty-rose text-foreground font-montserrat text-xs tracking-widest uppercase hover:bg-petal transition-all rounded-full"
            >
              Смотреть коллекции
            </button>
          </div>
          <div className="animate-fade-up opacity-0 delay-500 mt-14 flex items-center justify-center gap-8 text-center">
            {[["500+", "довольных клиенток"], ["7 лет", "опыта"], ["100%", "ручная работа"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-cormorant text-3xl text-deep-rose font-light">{v}</div>
                <div className="font-montserrat text-[10px] text-muted-foreground uppercase tracking-widest">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-dusty-rose/60" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
        <Section>
          <FloralDivider />
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-dusty-rose mb-3">Коллекции</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">
              Что мы создаём
            </h2>
          </div>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((c) => (
            <Section key={c.name}>
              <div className={`${c.color} rounded-2xl p-8 border border-border/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}>
                <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={c.icon} size={18} className="text-deep-rose" fallback="Heart" />
                </div>
                <h3 className="font-cormorant text-2xl font-medium text-foreground mb-2">{c.name}</h3>
                <p className="font-montserrat text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </Section>
          ))}
        </div>
        <Section>
          <div className="mt-16 rounded-3xl overflow-hidden relative h-72 md:h-96">
            <img src={IMG_HERO} alt="Коллекция" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex items-center">
              <div className="px-12">
                <p className="font-montserrat text-xs tracking-widest uppercase text-dusty-rose mb-3">Особый подход</p>
                <h3 className="font-cormorant text-4xl font-light text-foreground mb-4">Только натуральные<br />материалы</h3>
                <p className="font-montserrat text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Мы используем шёлк, тонкий хлопок, кружево ручной работы и итальянские ткани
                </p>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <LaceRow />

      {/* PROCESS */}
      <section id="process" className="py-24 px-6" style={{ background: "hsl(350, 25%, 96%)" }}>
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-dusty-rose mb-3">Как это работает</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">
                Процесс заказа
              </h2>
            </div>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {processSteps.map((s) => (
              <Section key={s.num}>
                <div className="flex gap-4">
                  <div className="font-cormorant text-5xl font-light text-dusty-rose/30 leading-none">{s.num}</div>
                  <div>
                    <h3 className="font-cormorant text-2xl font-medium text-foreground mb-2">{s.title}</h3>
                    <p className="font-montserrat text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>

          {/* MEASURE FORM */}
          <Section>
            <div id="measure-form" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/30">
              <div className="text-center mb-10">
                <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-dusty-rose mb-3">Онлайн-форма</p>
                <h3 className="font-cormorant text-4xl font-light text-foreground">Снятие мерок</h3>
                <p className="font-montserrat text-xs text-muted-foreground mt-2">
                  Заполните форму, и мы свяжемся с вами для уточнения деталей
                </p>
              </div>
              {formSent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-petal rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Check" size={28} className="text-deep-rose" />
                  </div>
                  <h4 className="font-cormorant text-3xl text-foreground mb-2">Спасибо!</h4>
                  <p className="font-montserrat text-xs text-muted-foreground">Мы получили ваши мерки и свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleMeasureSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: "name", label: "Имя", placeholder: "Ваше имя", type: "text" },
                      { key: "phone", label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
                      { key: "email", label: "E-mail", placeholder: "mail@example.com", type: "email" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block font-montserrat text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={(formData as Record<string, string>)[f.key]}
                          onChange={e => setFormData(v => ({ ...v, [f.key]: e.target.value }))}
                          className="w-full border border-border rounded-xl px-4 py-2.5 font-montserrat text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block font-montserrat text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Желаемое изделие</label>
                    <select
                      value={formData.product}
                      onChange={e => setFormData(v => ({ ...v, product: e.target.value }))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 font-montserrat text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      <option value="">Выберите тип изделия...</option>
                      <option>Комплект (бюстгальтер + трусики)</option>
                      <option>Бюстгальтер</option>
                      <option>Боди</option>
                      <option>Пеньюар</option>
                      <option>Корсет</option>
                      <option>Свадебный комплект</option>
                      <option>Другое</option>
                    </select>
                  </div>

                  <div>
                    <p className="font-montserrat text-[10px] tracking-widest uppercase text-muted-foreground mb-3">Мерки (в сантиметрах)</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { key: "bust", label: "Обхват груди" },
                        { key: "underBust", label: "Обхват под грудью" },
                        { key: "waist", label: "Обхват талии" },
                        { key: "hips", label: "Обхват бёдер" },
                        { key: "hipHeight", label: "Высота бёдер" },
                        { key: "thigh", label: "Обхват бедра" },
                        { key: "torsoLength", label: "Длина торса" },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block font-montserrat text-[10px] text-muted-foreground mb-1">{f.label}</label>
                          <div className="relative">
                            <input
                              type="number"
                              placeholder="—"
                              value={(formData as Record<string, string>)[f.key]}
                              onChange={e => setFormData(v => ({ ...v, [f.key]: e.target.value }))}
                              className="w-full border border-border rounded-xl px-3 py-2 font-montserrat text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-8"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-montserrat text-xs text-muted-foreground">см</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-montserrat text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Пожелания</label>
                    <textarea
                      placeholder="Опишите желаемый фасон, цвет, материал или любые другие пожелания..."
                      value={formData.notes}
                      onChange={e => setFormData(v => ({ ...v, notes: e.target.value }))}
                      rows={3}
                      className="w-full border border-border rounded-xl px-4 py-2.5 font-montserrat text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-10 py-3 bg-primary text-primary-foreground font-montserrat text-xs tracking-widest uppercase rounded-full hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                      Отправить мерки
                    </button>
                    <p className="font-montserrat text-[10px] text-muted-foreground mt-3">
                      Мы не передаём ваши данные третьим лицам
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Section>
        </div>
      </section>

      <LaceRow />

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <Section>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                <img src={IMG_CRAFT} alt="Мастерская" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                <img src={IMG_ATELIER} alt="Ателье" className="w-full h-full object-cover" />
              </div>
            </div>
          </Section>
          <Section>
            <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-dusty-rose mb-4">О нас</p>
            <h2 className="font-cormorant text-5xl font-light text-foreground mb-6">
              Маленькое ателье<br /><em>с большой душой</em>
            </h2>
            <p className="font-montserrat text-sm text-muted-foreground leading-relaxed mb-4">
              Наше ателье основано в 2017 году с простой идеей: каждая женщина заслуживает нижнего белья, которое создано именно для неё.
            </p>
            <p className="font-montserrat text-sm text-muted-foreground leading-relaxed mb-8">
              Мы не работаем с готовыми лекалами — каждое изделие разрабатывается с нуля по вашим меркам. Мы используем только сертифицированные ткани и фурнитуру премиального качества.
            </p>
            <div className="flex gap-6">
              {[["🤍", "Забота о деталях"], ["✂️", "Ручная работа"], ["📏", "Идеальная посадка"]].map(([e, l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl mb-1">{e}</div>
                  <div className="font-montserrat text-[10px] text-muted-foreground leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* TESTIMONIALS */}
        <Section>
          <div className="text-center mb-12">
            <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-dusty-rose mb-3">Отзывы</p>
            <h2 className="font-cormorant text-5xl font-light text-foreground">Истории наших клиенток</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-petal/40 rounded-2xl p-8 border border-border/30">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-deep-rose">★</span>)}
                </div>
                <p className="font-cormorant text-lg italic text-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <div className="font-montserrat text-sm font-medium text-foreground">{t.name}</div>
                  <div className="font-montserrat text-[10px] text-muted-foreground uppercase tracking-widest">{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <LaceRow />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6" style={{ background: "hsl(350, 25%, 96%)" }}>
        <div className="max-w-4xl mx-auto">
          <Section>
            <div className="text-center mb-12">
              <p className="font-montserrat text-xs tracking-[0.25em] uppercase text-dusty-rose mb-3">Связаться с нами</p>
              <h2 className="font-cormorant text-5xl font-light text-foreground">Контакты</h2>
            </div>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Section>
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "Mail", label: "E-mail", value: "hello@labelle.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, 1" },
                  { icon: "Clock", label: "Часы работы", value: "Пн–Сб: 10:00–19:00" },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-petal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={c.icon} size={16} className="text-deep-rose" fallback="Info" />
                    </div>
                    <div>
                      <div className="font-montserrat text-[10px] uppercase tracking-widest text-muted-foreground">{c.label}</div>
                      <div className="font-montserrat text-sm text-foreground">{c.value}</div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  {[
                    { icon: "MessageCircle", label: "Telegram" },
                    { icon: "Instagram", label: "Instagram" },
                  ].map(s => (
                    <button key={s.label} className="flex items-center gap-2 px-4 py-2 bg-petal rounded-full font-montserrat text-[10px] uppercase tracking-widest text-foreground hover:bg-blush transition-colors">
                      <Icon name={s.icon} size={14} className="text-deep-rose" fallback="Link" />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </Section>
            <Section>
              <div className="bg-white rounded-3xl p-8 border border-border/30 shadow-sm">
                <h3 className="font-cormorant text-2xl font-light text-foreground mb-6">Напишите нам</h3>
                {contactSent ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">💌</div>
                    <h4 className="font-cormorant text-2xl text-foreground mb-1">Сообщение отправлено!</h4>
                    <p className="font-montserrat text-xs text-muted-foreground">Ответим в ближайшее время</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {[
                      { key: "name", label: "Имя", placeholder: "Ваше имя", type: "text" },
                      { key: "phone", label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block font-montserrat text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={(contactForm as Record<string, string>)[f.key]}
                          onChange={e => setContactForm(v => ({ ...v, [f.key]: e.target.value }))}
                          className="w-full border border-border rounded-xl px-4 py-2.5 font-montserrat text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block font-montserrat text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">Сообщение</label>
                      <textarea
                        placeholder="Расскажите о вашем запросе..."
                        value={contactForm.message}
                        onChange={e => setContactForm(v => ({ ...v, message: e.target.value }))}
                        rows={3}
                        className="w-full border border-border rounded-xl px-4 py-2.5 font-montserrat text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-primary text-primary-foreground font-montserrat text-xs tracking-widest uppercase rounded-full hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
                    >
                      Отправить
                    </button>
                  </form>
                )}
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-border/40 text-center">
        <p className="font-cormorant text-2xl text-deep-rose font-light tracking-widest mb-2">La Belle</p>
        <p className="font-montserrat text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
          Ателье нижнего белья ✦ Индивидуальный пошив
        </p>
        <p className="font-montserrat text-[10px] text-muted-foreground">
          © 2024 La Belle. Все права защищены.
        </p>
      </footer>
    </div>
  );
}