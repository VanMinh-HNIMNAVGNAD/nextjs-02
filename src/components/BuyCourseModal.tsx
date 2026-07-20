"use client";

import { useState } from "react";
import Image from "next/image";
import type { Course } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  CreditCard,
  QrCode,
  Wallet,
  CheckCircle,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";

interface BuyCourseModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BuyCourseModal({
  course,
  isOpen,
  onClose,
  onSuccess,
}: BuyCourseModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "momo" | "card">("qr");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const formattedPrice = course.price
    ? `${course.price.toLocaleString("vi-VN")}đ`
    : "Miễn phí";

  const formattedOriginalPrice = course.originalPrice
    ? `${course.originalPrice.toLocaleString("vi-VN")}đ`
    : null;

  async function handleConfirmPayment() {
    setIsProcessing(true);
    // Simulate payment gateway delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsProcessing(false);
    setIsCompleted(true);

    setTimeout(() => {
      onSuccess();
      setIsCompleted(false);
      onClose();
    }, 1500);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && !open && onClose()}>
      <DialogContent className="rounded-2xl sm:max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Sparkle size={20} weight="fill" className="text-emerald-500" />
            <span>Thanh toán khóa học</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Mô phỏng thanh toán trực tuyến (Frontend Mocking Test)
          </DialogDescription>
        </DialogHeader>

        {isCompleted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
              <CheckCircle size={40} weight="fill" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Thanh toán thành công!</h3>
            <p className="mt-1 text-sm text-slate-600">
              Khóa học <span className="font-semibold text-slate-900">{course.title}</span> đã được kích hoạt.
            </p>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* Course Summary */}
            <div className="flex gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                  {course.title}
                </h4>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-emerald-600">
                    {formattedPrice}
                  </span>
                  {formattedOriginalPrice ? (
                    <span className="text-xs text-slate-400 line-through">
                      {formattedOriginalPrice}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Chọn phương thức thanh toán
              </label>

              <div className="grid gap-2.5 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("qr")}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition ${
                    paymentMethod === "qr"
                      ? "border-emerald-600 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-500/20"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <QrCode size={24} weight={paymentMethod === "qr" ? "fill" : "regular"} />
                  <span>Quét QR VNPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("momo")}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition ${
                    paymentMethod === "momo"
                      ? "border-pink-600 bg-pink-50/70 text-pink-800 ring-2 ring-pink-500/20"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Wallet size={24} weight={paymentMethod === "momo" ? "fill" : "regular"} />
                  <span>Ví MoMo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition ${
                    paymentMethod === "card"
                      ? "border-indigo-600 bg-indigo-50/70 text-indigo-800 ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <CreditCard size={24} weight={paymentMethod === "card" ? "fill" : "regular"} />
                  <span>Thẻ ngân hàng</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-100/70 px-3.5 py-2.5 text-xs text-slate-600">
              <ShieldCheck size={18} weight="duotone" className="shrink-0 text-emerald-600" />
              <span>Chế độ Test: Click bên dưới để kích hoạt mở khóa ngay lập tức.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="w-1/3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-75 active:scale-95"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <span>Xác nhận thanh toán ({formattedPrice})</span>
                )}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
