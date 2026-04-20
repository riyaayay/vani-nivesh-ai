import ChatInterface from "@/components/advisor/ChatInterface";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 max-w-2xl mx-auto">
      <header className="w-full flex items-center justify-between mb-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blostem-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            B
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">VaniNivesh</h1>
            <p className="text-xs text-slate-500 font-medium">Powered by Blostem AI</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
          <ShieldCheck size={14} />
          <span>RBI Compliant</span>
        </div>
      </header>

      <ChatInterface />
    </main>
  );
}
