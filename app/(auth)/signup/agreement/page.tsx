"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupStepper } from "@/components/auth/SignupStepper";
import { SignatureCanvas } from "@/components/auth/SignatureCanvas";
import { Loader2, AlertCircle, CheckCircle2, FileText, ScrollText } from "lucide-react";

const termsContent = `
TERMS AND CONDITIONS

1. ACCEPTANCE OF TERMS
By registering for and using Live Market, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

2. ACCOUNT REGISTRATION
- You must provide accurate and complete information during registration
- You are responsible for maintaining the confidentiality of your account credentials
- You must be at least 18 years old to create an account
- Each business may only have one account

3. SELLER OBLIGATIONS
- You agree to provide accurate product descriptions and pricing
- You are responsible for fulfilling orders in a timely manner
- You must comply with all applicable laws and regulations
- You agree to handle customer disputes professionally

4. PLATFORM USAGE
- Live Market reserves the right to suspend or terminate accounts that violate these terms
- You may not use the platform for illegal activities
- You agree not to interfere with the platform's operation

5. FEES AND PAYMENTS
- Platform fees and commission rates are subject to change with notice
- Payments will be processed according to our payment schedule
- You are responsible for all applicable taxes

6. INTELLECTUAL PROPERTY
- You retain ownership of your content
- You grant Live Market a license to display your content on the platform
- You may not use Live Market's trademarks without permission

7. LIMITATION OF LIABILITY
Live Market is not liable for indirect, incidental, or consequential damages arising from your use of the platform.

8. CHANGES TO TERMS
We may update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.

9. GOVERNING LAW
These terms are governed by applicable laws in your jurisdiction.

10. CONTACT
For questions about these terms, contact us at legal@livemarket.com.
`;

function AgreementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");

  // Fetch registration info
  useEffect(() => {
    if (registrationId) {
      fetch(`/api/signup/status?id=${registrationId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBusinessName(data.data.businessName);
            // If not verified, redirect back
            if (!data.data.otpVerified) {
              router.push(`/signup/verify?id=${registrationId}`);
            }
          } else {
            setError("Registration not found. Please start over.");
          }
        })
        .catch(() => {
          setError("Failed to load registration data.");
        });
    }
  }, [registrationId, router]);

  const handleComplete = async () => {
    if (!agreed) {
      setError("You must agree to the terms and conditions");
      return;
    }

    if (!signatureData) {
      setError("Please provide your signature");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          agreedToTerms: agreed,
          signatureData,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/registration-complete");
      } else {
        setError(data.error || "Failed to complete registration");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!registrationId) {
    return (
      <div className="w-full max-w-md text-center">
        <Card className="border-border/50 shadow-lg">
          <CardContent className="py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h2 className="mt-4 text-xl font-semibold">Invalid Request</h2>
            <p className="mt-2 text-muted-foreground">
              Registration ID is missing. Please start the signup process again.
            </p>
            <Button asChild className="mt-6">
              <a href="/signup">Start Over</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Stepper */}
      <div className="mb-8">
        <SignupStepper currentStep={3} />
      </div>

      <Card className="border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Terms & Agreement</CardTitle>
          <CardDescription>
            Please review and sign to complete your registration
            {businessName && (
              <span className="block mt-1 font-medium text-foreground">
                for {businessName}
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Terms Content */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ScrollText className="h-4 w-4" />
              Terms and Conditions
            </div>
            <div className="h-48 overflow-y-auto rounded-lg border border-border bg-muted/30 p-4">
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
                {termsContent}
              </pre>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              disabled={loading}
            />
            <span className="text-sm">
              I have read and agree to the{" "}
              <span className="font-medium text-primary">Terms and Conditions</span>{" "}
              and{" "}
              <span className="font-medium text-primary">Privacy Policy</span>.
              I understand that my account will be reviewed and approved by the admin team.
            </span>
          </label>

          {/* Signature */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-4 w-4" />
              Your Signature
            </div>
            <SignatureCanvas
              onSignatureChange={setSignatureData}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleComplete}
            className="w-full gradient-bg hover:opacity-90"
            disabled={loading || !agreed || !signatureData}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Completing Registration...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Complete Registration
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function AgreementPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-2xl flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AgreementContent />
    </Suspense>
  );
}
