import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, Clock, ArrowRight, Home } from "lucide-react";

export default function RegistrationCompletePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4">
      <Card className="w-full max-w-lg border-border/50 shadow-lg">
        <CardContent className="pt-12 pb-8 px-8">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-center text-2xl font-bold text-foreground">
            Бүртгэл амжилттай илгээгдлээ!
          </h1>

          {/* Description */}
          <p className="mt-4 text-center text-muted-foreground">
            Live Market-д бүртгүүлсэнд баярлалаа. Таны өргөдөл амжилттай илгээгдсэн бөгөөд
            одоо хянагдаж байна.
          </p>

          {/* Info Cards */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 rounded-lg border border-border bg-background p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Дараа нь юу болох вэ?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Манай админ баг таны өргөдлийг хянана. Энэ нь ажлын өдрүүдэд
                  ихэвчлэн 24-48 цаг болдог.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-border bg-background p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
                <Mail className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Имэйлээ шалгана уу</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Таны бүртгэл баталгаажсаны дараа та нэвтрэх мэдээлэл болон
                  эхлэх зааврыг имэйлээр хүлээн авна.
                </p>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-800">
              <strong>Анхаар:</strong> Таны бүртгэл баталгаажих хүртэл идэвхгүй байх болно.
              Та баталгаажуулах имэйл хүлээн авах хүртэл нэвтрэх боломжгүй.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild className="w-full gradient-bg hover:opacity-90">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Нүүр хуудас руу буцах
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">
                Нэвтрэх хуудас руу
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Асуулт байна уу? Бидэнтэй холбогдоорой{" "}
            <a href="mailto:support@livemarket.com" className="text-primary hover:underline">
              support@livemarket.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
