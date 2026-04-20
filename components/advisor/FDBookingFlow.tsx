"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Building2, Calendar, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FDBookingFlow({ onBack, language }: { onBack: () => void, language: string }) {
  const [step, setStep] = useState<"confirm" | "processing" | "success">("confirm");

  const texts = {
    en: { title: "Confirm Details", process: "Processing...", success: "FD Booked Successfully!", back: "Back to Home", btn: "Pay via UPI & Book" },
    hi: { title: "विवरण की पुष्टि करें", process: "प्रक्रिया हो रही है...", success: "एफडी सफलतापूर्वक बुक हो गई!", back: "होम पर वापस जाएं", btn: "UPI से भुगतान करें और बुक करें" },
    mr: { title: "तपशील तपासा", process: "प्रक्रिया सुरू आहे...", success: "FD यशस्वीरित्या बुक झाली!", back: "होम वर परत जा", btn: "UPI ने पैसे भरा आणि बुक करा" }
  };

  const t = texts[language as keyof typeof texts];

  const handleBook = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 2500);
  };

  if (step === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center w-full flex-grow bg-emerald-50 rounded-3xl p-8 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-emerald-500 mb-4"
        >
          <CheckCircle2 size={80} fill="currentColor" className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t.success}</h2>
        <p className="text-slate-600 mb-8 max-w-xs">Your money is now safely growing with Suryoday Small Finance Bank via Blostem.</p>
        
        <div className="bg-white rounded-2xl p-6 w-full shadow-sm border border-emerald-100 mb-8 text-left space-y-3">
          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-500">Amount</span>
            <span className="font-bold text-slate-800">₹1,00,000</span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <span className="text-slate-500">Interest Rate</span>
            <span className="font-bold text-emerald-600">8.50% p.a.</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Maturity Amount</span>
            <span className="font-bold text-slate-800">₹1,08,500</span>
          </div>
        </div>

        <Button onClick={onBack} variant="outline" className="w-full rounded-xl bg-white">
          {t.back}
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full flex-grow bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="font-bold text-lg text-slate-800">{t.title}</h2>
        <div className="bg-blue-100 text-blostem-700 px-2 py-1 rounded text-xs font-bold">DICGC Insured</div>
      </div>

      <div className="p-6 flex-grow space-y-6">
        {/* Bank Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="font-bold">Suryoday SFB</h3>
              <p className="text-slate-400 text-xs">Partnered via Blostem</p>
            </div>
          </div>
          <div className="flex justify-between items-end relative z-10">
            <div>
              <p className="text-slate-400 text-xs mb-1">Investment Amount</p>
              <p className="text-3xl font-bold">₹1,00,000</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 font-bold text-xl">8.50%</p>
              <p className="text-slate-400 text-xs">Interest p.a.</p>
            </div>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Calendar size={18} />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-slate-800">Tenure</p>
              <p className="text-xs text-slate-500">12 Months (Matures Apr 2027)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp size={18} />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-semibold text-slate-800">Maturity Amount</p>
              <p className="text-xs text-slate-500">₹1,08,500 at end of tenure</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <Button 
          onClick={handleBook} 
          disabled={step === "processing"}
          className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-blostem-200 transition-all active:scale-[0.98]"
        >
          {step === "processing" ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t.process}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {t.btn} <ChevronRight size={20} />
            </div>
          )}
        </Button>
        <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
          <ShieldCheck size={14} /> Powered securely by Blostem Infrastructure
        </p>
      </div>
    </motion.div>
  );
}
