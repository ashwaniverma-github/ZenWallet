"use client";
import { Copy, Key, ShieldAlert , Loader2 } from "lucide-react";
import { useFormContext } from "../lib/formContext";
import { useState } from "react";

interface MnemonicSectionProps {
  onCopy: () => void;
}

function MnemonicSection({ onCopy }: MnemonicSectionProps) {
  const { seedPhrase, setSeedPhrase } = useFormContext();
  const [generating,setGenerating] = useState(false)

  async function generateSeed() {
    setGenerating(true)
    const response = await fetch("/api/generateMnemonic");
    const data = await response.json();
    setSeedPhrase(data.seedPhrase);
  }

  return (
    <div className="glass-panel p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center ring-4 ring-amber-500/10">
            <Key className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="font-semibold text-lg sm:text-xl">Secret recovery phrase</h1>
            <p className="text-gray-400 text-xs sm:text-sm">Your unique 12-word secret phrase is</p>
          </div>
        </div>
        {seedPhrase ? (
          <div>{}</div>
        ) : (
          <button 
            onClick={generateSeed} 
            className="font-bold text-base my-10  sm:my-0 sm:text-lg px-16 sm:px-4 mx-auto sm:mx-0 py-4 sm:py-2 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] transition"
          >
            {generating?(
              <div className=" animate-spin " ><Loader2 /></div>
            ):(
              <div>Generate</div>
            )}
          </button>
        )}
      </div>

      {seedPhrase ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 bg-slate-900/60 rounded-lg p-3 sm:p-4 md:p-6 gap-2 sm:gap-3">
            {seedPhrase.split(" ").map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 hover:bg-white/[0.03] rounded-lg p-2 sm:p-3"
              >
                <span className="text-indigo-400/70 text-xs sm:text-sm font-medium min-w-[20px] sm:min-w-[24px]">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="font-mono text-gray-300 text-sm sm:text-base break-all">
                  {word}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
            <button
              onClick={onCopy}
              className="px-4 py-2 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] flex items-center justify-center sm:justify-start gap-2 text-gray-400 hover:text-white transition"
            >
              <Copy className="w-4 h-4" />
              Copy Phrase
            </button>
          </div>
          <div className="flex items-start sm:items-center gap-2 mt-2 bg-amber-500/10 p-2 sm:p-3 rounded-lg">
            <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 flex-shrink-0 mt-1 sm:mt-0" />
            <p className="text-amber-200/80 text-xs sm:text-sm">
              Never share your secret phrase. Anyone with these words can access your wallet
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-8 sm:py-12 md:py-16 px-4 sm:px-6">
          <p className="text-gray-400 text-sm sm:text-base">
            Generate a secure recovery phrase to start managing your wallets.
          </p>
        </div>
      )}
    </div>
  );
}

export default MnemonicSection;