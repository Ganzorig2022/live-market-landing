import { Video, Package, ShoppingCart, BarChart3, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live Streaming Sales",
    description: "Go live and sell directly to your audience. Engage customers in real-time with interactive features.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Track stock levels, manage warehouses, and never oversell with real-time inventory sync.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: ShoppingCart,
    title: "Order Processing",
    description: "Seamless order management from live stream to delivery. Automated workflows save you time.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Understand your business with detailed insights on sales, viewers, and conversion rates.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Multiple payment options with fraud protection. Your money is safe with us.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Built for speed and scale. Handle thousands of concurrent viewers without breaking a sweat.",
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
          <h2 className="text-3xl font-bold tracking-tight text-[#1E0E62] sm:text-4xl">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">sell live</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed for modern live commerce sellers.
            From streaming to shipping, we've got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-3xl border border-gray-200 bg-white p-8 transition-all hover:shadow-xl hover:border-purple-200"
            >
              <div className={`inline-flex rounded-2xl p-3 ${feature.bgColor}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1E0E62]">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
