"use client";

import { useRef, useEffect, useState } from "react";
import SignaturePad from "signature_pad";
import { Button } from "@/components/ui/button";
import { Eraser, Check } from "lucide-react";

interface SignatureCanvasProps {
  onSignatureChange: (signatureData: string | null) => void;
  className?: string;
}

export function SignatureCanvas({ onSignatureChange, className }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (canvasRef.current) {
      // Set up signature pad
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgb(255, 255, 255)",
        penColor: "rgb(0, 0, 0)",
      });

      // Handle canvas resize
      const resizeCanvas = () => {
        if (canvasRef.current && signaturePadRef.current) {
          const ratio = Math.max(window.devicePixelRatio || 1, 1);
          const canvas = canvasRef.current;
          const rect = canvas.getBoundingClientRect();
          
          canvas.width = rect.width * ratio;
          canvas.height = rect.height * ratio;
          canvas.getContext("2d")?.scale(ratio, ratio);
          
          // Clear the canvas after resize
          signaturePadRef.current.clear();
          setIsEmpty(true);
          onSignatureChange(null);
        }
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Listen for signature changes
      signaturePadRef.current.addEventListener("endStroke", () => {
        if (signaturePadRef.current) {
          setIsEmpty(signaturePadRef.current.isEmpty());
          if (!signaturePadRef.current.isEmpty()) {
            onSignatureChange(signaturePadRef.current.toDataURL());
          }
        }
      });

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        signaturePadRef.current?.off();
      };
    }
  }, [onSignatureChange]);

  const handleClear = () => {
    signaturePadRef.current?.clear();
    setIsEmpty(true);
    onSignatureChange(null);
  };

  return (
    <div className={className}>
      <div className="relative rounded-lg border-2 border-dashed border-muted-foreground/30 bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-40 touch-none cursor-crosshair"
          style={{ touchAction: "none" }}
        />
        
        {/* Placeholder text */}
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground text-sm">Энд гарын үсэг зурна уу</p>
          </div>
        )}

        {/* Status indicator */}
        {!isEmpty && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            <Check className="h-3 w-3" />
            Гарын үсэг зурсан
          </div>
        )}
      </div>

      {/* Clear button */}
      <div className="mt-2 flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={isEmpty}
        >
          <Eraser className="mr-2 h-4 w-4" />
          Арилгах
        </Button>
      </div>
    </div>
  );
}
