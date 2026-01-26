import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function LandingPage() {
	return (
		<>
			<Hero />
			<Features />
			<HowItWorks />
			<FAQ />
		</>
	);
}
