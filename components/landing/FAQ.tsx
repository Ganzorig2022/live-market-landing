"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Live Market гэж юу вэ?",
    answer:
      "Live Market бол шууд худалдааны худалдагчдад зориулсан бүх зүйл нэг дор байх платформ юм. Энэ нь танд үзэгчдэдээ шууд дамжуулах, бүтээгдэхүүн болон нөөцийг удирдах, захиалга боловсруулах, хүчирхэг аналитик хэрэгслээр бизнесээ өсгөх боломжийг олгоно.",
  },
  {
    question: "Хэрхэн бүртгүүлэх вэ?",
    answer:
      "Бүртгүүлэхэд хялбар! 'Худалдаа эхлүүлэх' товчийг дарж, бизнесийн мэдээллээ бөглөж, имэйлээ OTP кодоор баталгаажуулж, нөхцлийн гэрээнд гарын үсэг зурна уу. Таны бүртгэлийг манай баг хянана.",
  },
  {
    question: "Баталгаажуулалт хэр удаан үргэлжлэх вэ?",
    answer:
      "Ихэнх бүртгэлийг 24-48 цагийн дотор хянадаг. Баталгаажсаны дараа та нэвтрэх мэдээлэл бүхий имэйл хүлээн авч, дэлгүүрээ тохируулж эхлэх боломжтой.",
  },
  {
    question: "Платформ ашиглахад төлбөртэй юу?",
    answer:
      "Бид жижиг худалдагчдад эхлэхэд зориулсан үнэгүй түвшин санал болгодог. Бизнес тань өсөхөд нэмэлт боломжуудтай боломжийн үнэтэй төлөвлөгөөнүүд байдаг. Та зөвхөн амжилттай борлуулалтаас бага хэмжээний шимтгэл төлнө.",
  },
  {
    question: "Ямар төлбөрийн аргуудыг дэмждэг вэ?",
    answer:
      "Бид кредит/дебит карт, банкны шилжүүлэг болон алдартай дижитал түрийвч зэрэг олон төлбөрийн аргыг дэмждэг. Бүх төлбөрийг луйврын хамгаалалттай аюулгүй боловсруулдаг.",
  },
  {
    question: "Тусламжийн багтай хэрхэн холбогдох вэ?",
    answer:
      "Та манай тусламжийн багтай support@livemarket.com имэйлээр эсвэл апп доторх чатаар холбогдож болно. Бид ажлын өдрүүдэд хэдхэн цагийн дотор хариулдаг.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Түгээмэл{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand">асуултууд</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Хайж буй зүйлээ олохгүй байна уу? Манай тусламжийн багтай холбогдоорой.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white shadow-sm">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-base font-medium pr-4 text-primary">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
