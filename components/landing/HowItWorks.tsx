import { UserPlus, ClipboardCheck, Rocket } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your business account in minutes. Tell us about your shop and verify your email.",
    color: "text-primary",
    borderColor: "border-primary",
    bgColor: "bg-primary",
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: "Get Approved",
    description: "Our team reviews your application. Once approved, you'll receive login credentials via email.",
    color: "text-secondary",
    borderColor: "border-secondary",
    bgColor: "bg-secondary",
  },
  {
    step: 3,
    icon: Rocket,
    title: "Start Selling",
    description: "Set up your products, go live, and start selling to your audience. It's that simple!",
    color: "text-accent",
    borderColor: "border-accent",
    bgColor: "bg-accent",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-gradient-to-b from-purple-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E0E62] sm:text-4xl">
            Get started in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">3 easy steps</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of sellers who are already growing their business with Live Market.
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative">
            {/* Connection line (desktop) */}
            <div className="absolute top-24 left-0 right-0 hidden h-px bg-gray-200 lg:block" />

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              {steps.map((item, index) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  {/* Step number badge */}
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${item.bgColor} text-white font-bold text-lg shadow-lg`}
                  >
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`mt-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md border border-gray-100`}
                  >
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-semibold text-[#1E0E62]">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>

                  {/* Arrow (mobile) */}
                  {index < steps.length - 1 && (
                    <div className="mt-8 h-8 w-px bg-gray-200 lg:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
