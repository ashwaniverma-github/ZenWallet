"use client";
import { useState } from "react";
import { Copy, Key  , ShieldAlert} from "lucide-react";
import { Toast } from "./sm-component/toast";
import { useFormContext } from "../lib/formContext";
function MnemonicSection() {
  const {seedPhrase, setSeedPhrase} = useFormContext()
  const [toast,setToast] = useState({message:"",visible:false})

  async function generateSeed() {
    const response = await fetch("/api/generateMnemonic");
    const data = await response.json();
    setSeedPhrase(data.seedPhrase);
  }

  const copy = () => {
    navigator.clipboard.writeText(seedPhrase);
    showToast("Copied to CLipboard")
  };

  const showToast = (message:string)=>{
    setToast({message,visible:true})
    setTimeout(()=>setToast({message,visible:false}),2000)
  }

  return (
    <div className="glass-panel p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center ring-4 ring-amber-500/10">
            <Key className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="font-semibold text-xl">Secret recovery phrase</h1>
            <p className="text-gray-400 text-sm">Your unique 12-word secret phrase is</p>
          </div>
        </div>
        <button onClick={generateSeed} className="font-bold text-lg">
          Generate
        </button>
      </div>

      {seedPhrase ? (
        <>
          <div className="grid grid-cols-3 bg-slate-900/60 rounded-lg p-6 gap-3">
            {seedPhrase.split(" ").map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-3 hover:bg-white/[0.03] rounded-lg p-3"
              >
                <span className="text-indigo-400/70 text-sm font-medium">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="font-mono text-gray-300">{word}</span>
              </div>
            ))}
          </div>
          <button
            onClick={copy}
            className="mt-4 px-4 py-2 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <Copy className="w-4 h-4" />
            Copy Phrase
          </button>
          <div className="flex items-center gap-2 mt-2 bg-amber-500/10 p-2 rounded-lg ">
            <ShieldAlert className="text-amber-400" />
            <p className="text-amber-200/80" >Never share your secret phrase. Anyone with these words can access your wallet </p>
          </div>
        </>
        
      ) : (
        <div className="text-center py-16 px-6">
          <p className="text-gray-400">Generate a secure recovery phrase to start managing your wallets.</p>
        </div>
      )}

      {toast.visible && <Toast message={toast.message} visible={toast.visible} /> }
    </div>
    
  );
}

export default MnemonicSection;
