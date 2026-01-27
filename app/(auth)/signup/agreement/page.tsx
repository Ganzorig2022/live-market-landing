"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupStepper } from "@/components/auth/SignupStepper";
import { SignatureCanvas } from "@/components/auth/SignatureCanvas";
import { AgreementFileUpload } from "@/components/auth/AgreementFileUpload";
import { Loader2, AlertCircle, CheckCircle2, FileText, ScrollText } from "lucide-react";

const termsContent = `
ҮЙЛЧИЛГЭЭНИЙ НӨХЦӨЛ

1. НӨХЦЛИЙГ ХҮЛЭЭН ЗӨВШӨӨРӨХ
Live Market-д бүртгүүлж, ашигласнаар та эдгээр Үйлчилгээний Нөхцлийг дагаж мөрдөхийг зөвшөөрч байна. Хэрэв та эдгээр нөхцлийг хүлээн зөвшөөрөхгүй бол манай үйлчилгээг бүү ашиглана уу.

2. БҮРТГЭЛ ҮҮСГЭХ
- Та бүртгүүлэхдээ үнэн зөв, бүрэн мэдээлэл өгөх ёстой
- Та өөрийн бүртгэлийн нэвтрэх мэдээллийг нууцлах үүрэгтэй
- Бүртгэл үүсгэхэд 18-аас дээш насны байх ёстой
- Бизнес бүр зөвхөн нэг бүртгэлтэй байж болно

3. ХУДАЛДАГЧИЙН ҮҮРЭГ
- Та бүтээгдэхүүний тодорхойлолт, үнийг үнэн зөв оруулахыг зөвшөөрч байна
- Та захиалгыг цаг тухайд нь биелүүлэх үүрэгтэй
- Та холбогдох хууль тогтоомжийг дагаж мөрдөх ёстой
- Та хэрэглэгчийн гомдлыг мэргэжлийн түвшинд шийдвэрлэхийг зөвшөөрч байна

4. ПЛАТФОРМЫГ АШИГЛАХ
- Live Market эдгээр нөхцлийг зөрчсөн бүртгэлийг түр түдгэлзүүлэх эсвэл цуцлах эрхтэй
- Та платформыг хууль бус үйлдэлд ашиглаж болохгүй
- Та платформын үйл ажиллагаанд саад учруулахгүй байхыг зөвшөөрч байна

5. ХУРААМЖ БА ТӨЛБӨР
- Платформын хураамж, шимтгэлийн хувь нь урьдчилан мэдэгдэж өөрчлөгдөж болно
- Төлбөрийг манай төлбөрийн хуваарийн дагуу боловсруулна
- Та бүх холбогдох татварыг хариуцна

6. ОЮУНЫ ӨМЧ
- Та өөрийн контентын өмчлөгч хэвээр байна
- Та Live Market-д өөрийн контентыг платформ дээр харуулах зөвшөөрөл олгож байна
- Та Live Market-ын барааны тэмдгийг зөвшөөрөлгүйгээр ашиглаж болохгүй

7. ХАРИУЦЛАГЫН ХЯЗГААРЛАЛТ
Live Market нь таны платформ ашигласнаас үүдсэн шууд бус, санамсаргүй эсвэл үр дагаварт хохирлыг хариуцахгүй.

8. НӨХЦЛИЙН ӨӨРЧЛӨЛТ
Бид эдгээр нөхцлийг хүссэн үедээ шинэчилж болно. Платформыг үргэлжлүүлэн ашиглах нь шинэчилсэн нөхцлийг хүлээн зөвшөөрсөнд тооцогдоно.

9. ХУУЛЬ ЗҮЙН ЗОХИЦУУЛАЛТ
Эдгээр нөхцлийг таны харьяаллын хуулиар зохицуулна.

10. ХОЛБОО БАРИХ
Эдгээр нөхцлийн талаар асуулт байвал legal@livemarket.com хаягаар холбогдоно уу.
`;

function AgreementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [documentUrls, setDocumentUrls] = useState<string[]>([]);
  const [businessName, setBusinessName] = useState("");

  // Fetch registration info
  useEffect(() => {
    if (registrationId) {
      fetch(`/api/public/registration/status?id=${registrationId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBusinessName(data.data.businessName);
            // If not verified, redirect back
            if (!data.data.otpVerified) {
              router.push(`/signup/verify?id=${registrationId}`);
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

  const handleComplete = async () => {
    if (!agreed) {
      setError("Та үйлчилгээний нөхцлийг зөвшөөрөх ёстой");
      return;
    }

    if (!signatureData) {
      setError("Гарын үсгээ зурна уу");
      return;
    }

    if (documentUrls.length === 0) {
      setError("Дор хаяж нэг баримт бичиг оруулах шаардлагатай");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/public/registration/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          agreedToTerms: agreed,
          signatureData,
          documentUrls,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/registration-complete");
      } else {
        setError(data.error || "Бүртгэлийг дуусгахад алдаа гарлаа");
      }
    } catch {
      setError("Алдаа гарлаа. Дахин оролдоно уу.");
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
          <CardTitle className="text-2xl font-bold">Нөхцөл & Гэрээ</CardTitle>
          <CardDescription>
            Бүртгэлээ дуусгахын тулд уншиж, гарын үсэг зурна уу
            {businessName && (
              <span className="block mt-1 font-medium text-foreground">
                {businessName}-д зориулсан
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
              Үйлчилгээний нөхцөл
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
              Би{" "}
              <span className="font-medium text-primary">Үйлчилгээний нөхцөл</span>{" "}
              болон{" "}
              <span className="font-medium text-primary">Нууцлалын бодлого</span>-ыг уншиж, зөвшөөрч байна.
              Миний бүртгэлийг админ баг шалгаж баталгаажуулахыг ойлгож байна.
            </span>
          </label>

          {/* Agreement Documents Upload */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-4 w-4" />
              Гэрээний баримт бичиг
            </div>
            <AgreementFileUpload
              onFilesChange={setDocumentUrls}
              disabled={loading}
            />
          </div>

          {/* Signature */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-4 w-4" />
              Таны гарын үсэг
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
            disabled={loading || !agreed || !signatureData || documentUrls.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Бүртгэлийг дуусгаж байна...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Бүртгэлийг дуусгах
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
