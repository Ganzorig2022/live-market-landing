"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupStepper } from "@/components/auth/SignupStepper";
import { Loader2, AlertCircle, ArrowRight, Mail } from "lucide-react";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("id");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [email, setEmail] = useState("");

  // Fetch registration info
  useEffect(() => {
    if (registrationId) {
      fetch(`/api/signup/status?id=${registrationId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setEmail(data.data.email);
            // If already verified, redirect to agreement
            if (data.data.otpVerified) {
              router.push(`/signup/agreement?id=${registrationId}`);
            }
          } else {
            setError("Бүртгэл олдсонгүй. Дахин эхлүүлнэ үү.");
          }
        })
        .catch(() => {
          setError("Бүртгэлийн мэдээлэл ачаалахад алдаа гарлаа.");
        });
    }
  }, [registrationId, router]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      // Focus last filled input or next empty
      const nextIndex = Math.min(index + digits.length, 5);
      document.getElementById(`otp-${nextIndex}`)?.focus();
    } else {
      // Single digit
      const newOtp = [...otp];
      newOtp[index] = value.replace(/\D/g, "");
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = useCallback(async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("6 оронтой кодыг бүрэн оруулна уу");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          otpCode,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(`/signup/agreement?id=${registrationId}`);
      } else {
        setError(data.error || "Баталгаажуулах код буруу байна");
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      }
    } catch {
      setError("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  }, [otp, registrationId, router]);

  const handleResend = async () => {
    setResending(true);
    setError("");

    try {
      const res = await fetch("/api/signup/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCooldown(60); // 60 second cooldown
        setOtp(["", "", "", "", "", ""]);
      } else {
        setError(data.error || "Код дахин илгээхэд алдаа гарлаа");
      }
    } catch {
      setError("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setResending(false);
    }
  };

  // Auto-submit when OTP is complete
  useEffect(() => {
    if (otp.every((digit) => digit !== "") && !loading) {
      handleVerify();
    }
  }, [otp, loading, handleVerify]);

  if (!registrationId) {
    return (
      <div className="w-full max-w-md text-center">
        <Card className="border-border/50 shadow-lg">
          <CardContent className="py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h2 className="mt-4 text-xl font-semibold">Буруу хүсэлт</h2>
            <p className="mt-2 text-muted-foreground">
              Бүртгэлийн ID байхгүй байна. Бүртгүүлэх үйл явцыг дахин эхлүүлнэ үү.
            </p>
            <Button asChild className="mt-6">
              <a href="/signup">Дахин эхлүүлэх</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Stepper */}
      <div className="mb-8">
        <SignupStepper currentStep={2} />
      </div>

      <Card className="border-border/50 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Имэйлээ шалгана уу</CardTitle>
          <CardDescription>
            Бид 6 оронтой баталгаажуулах код илгээсэн
            <br />
            <span className="font-medium text-foreground">{email || "таны имэйл"}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* OTP Input */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-14 w-12 text-center text-2xl font-bold"
                disabled={loading}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Код ирээгүй юу?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending || cooldown > 0}
              className="font-medium text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? (
                "Илгээж байна..."
              ) : cooldown > 0 ? (
                `${cooldown} секундын дараа дахин илгээх`
              ) : (
                "Дахин илгээх"
              )}
            </button>
          </p>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleVerify}
            className="w-full gradient-bg hover:opacity-90"
            disabled={loading || otp.some((d) => !d)}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Баталгаажуулж байна...
              </>
            ) : (
              <>
                Баталгаажуулах
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-md flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <VerifyOTPContent />
    </Suspense>
  );
}
