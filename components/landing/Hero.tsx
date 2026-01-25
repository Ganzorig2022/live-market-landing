import Link from "next/link";
import { ArrowRight, Play, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>The Future of Live Commerce</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Sell Live,{" "}
            <span className="gradient-text">Grow Fast</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            The all-in-one platform for live commerce sellers. Stream to your audience, 
            manage orders in real-time, and scale your business with powerful tools.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="w-full sm:w-auto gradient-bg hover:opacity-90">
              <Link href="/signup">
                Start Selling Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <a href="#how-it-works">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold sm:text-3xl">10K+</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Active Sellers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span className="text-2xl font-bold sm:text-3xl">$50M+</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">GMV Processed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold sm:text-3xl">99.9%</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
