import { Video, Package, ShoppingCart, BarChart3, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Шууд дамжуулалтаар борлуулах",
    description: "Шууд нэвтрүүлэг хийж, үзэгчдэдээ шууд худалдана уу. Интерактив боломжуудаар хэрэглэгчидтэй бодит цагт харилцана.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Package,
    title: "Бараа материалын удирдлага",
    description: "Нөөцийн түвшинг хянаж, агуулахуудыг удирдаж, бодит цагийн синхрончлолоор хэзээ ч илүү борлуулахгүй.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: ShoppingCart,
    title: "Захиалга боловсруулалт",
    description: "Шууд дамжуулалтаас хүргэлт хүртэлх захиалгын саадгүй удирдлага. Автомат ажлын урсгал нь таны цагийг хэмнэнэ.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Аналитик самбар",
    description: "Борлуулалт, үзэгчид, хөрвүүлэлтийн хувь хэмжээний талаарх дэлгэрэнгүй мэдээллээр бизнесээ ойлгоорой.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Найдвартай төлбөр",
    description: "Луйврын хамгаалалттай олон төлбөрийн сонголт. Таны мөнгө биднийг хамт аюулгүй.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Хурдан & Найдвартай",
    description: "Хурд болон цар хүрээнд зориулсан. Мянга мянган зэрэгцээ үзэгчдийг хялбархан зохицуулна.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Шууд худалдаа хийхэд{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand">хэрэгтэй бүх зүйл</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Орчин үеийн шууд худалдааны худалдагчдад зориулсан хүчирхэг боломжууд.
            Нэвтрүүлгээс хүргэлт хүртэл бүгдийг бид хариуцна.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-3xl border border-gray-200 bg-white p-8 transition-all hover:shadow-xl hover:border-primary/20"
            >
              <div className={`inline-flex rounded-2xl p-3 ${feature.bgColor}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
