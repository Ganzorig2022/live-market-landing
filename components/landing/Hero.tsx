import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const adminLoginUrl =
    process.env.NEXT_PUBLIC_ADMIN_LOGIN_URL ?? "/login";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      {/* Background decoration - softer, more subtle */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700">
              <Sparkles className="h-4 w-4" />
              <span>Шууд худалдааны ирээдүй</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-[#1E0E62] sm:text-5xl lg:text-6xl leading-tight">
              Дэлгүүрийнхээ нэрийг одоо бүртгүүлээрэй!
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-relaxed text-[#6B7280] sm:text-xl max-w-xl">
              Live Market-ээр хэн ч онлайнаар анхны орлогоо олох боломжтой. Зүгээр л мэддэг зүйлээсээ эхлээрэй. Ийм л амархан.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-[#1E0E62] hover:bg-[#160A4D] text-white rounded-full px-8"
              >
                <Link href="/signup">Худалдаа эхлүүлэх</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto rounded-full px-8"
              >
                <Link href={adminLoginUrl}>Нэвтрэх</Link>
              </Button>
            </div>

            {/* Stats - Compact version */}
            <div className="mt-12 flex gap-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#1E0E62]">10K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Идэвхтэй худалдагч</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#1E0E62]">$50M+</span>
                </div>
                <p className="text-sm text-muted-foreground">Нийт борлуулалт</p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#1E0E62]">99.9%</span>
                </div>
                <p className="text-sm text-muted-foreground">Ажиллагаатай байдал</p>
              </div>
            </div>
          </div>

          {/* Right side - Illustration placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-96">
              {/* 3D Isometric-style illustration placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Shop building */}
                  <div className="w-64 h-64 bg-gradient-to-br from-white to-purple-100 rounded-[3rem] shadow-xl border border-purple-200 flex items-center justify-center">
                    <ShoppingBag className="h-24 w-24 text-purple-400" />
                  </div>
                  {/* Floating boxes */}
                  <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl shadow-lg transform rotate-12" />
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl shadow-lg transform -rotate-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
