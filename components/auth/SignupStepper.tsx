import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { number: 1, title: "Organization", description: "Business details" },
  { number: 2, title: "Verification", description: "Email OTP" },
  { number: 3, title: "Agreement", description: "Terms & Signature" },
];

interface SignupStepperProps {
  currentStep: number;
}

export function SignupStepper({ currentStep }: SignupStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all",
                  currentStep > step.number
                    ? "border-primary bg-primary text-white"
                    : currentStep === step.number
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    currentStep >= step.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-12 sm:w-24 lg:w-32",
                  currentStep > step.number ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
