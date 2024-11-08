'use client'
import { Shield } from 'lucide-react';
import MnemonicSection from './components/mnemonicSection';
import WalletSection from './components/walletSection';
import { useFormContext } from './lib/formContext';
import { useState } from 'react';
import { Toast } from './components/sm-component/toast';

export default function Home() {
  const {seedPhrase} = useFormContext()
  const [toast,setToast] = useState({message:"",visible:false})

  const copySeed = () => {
    navigator.clipboard.writeText(seedPhrase);
    showToast("Copied to CLipboard")
  };
  const copyWallet = (address:string)=>{
    navigator.clipboard.writeText(address)
    showToast("Wallet address copied to clipboard")
  }

  const showToast = (message:string)=>{
    setToast({message,visible:true})
    setTimeout(()=>setToast({message,visible:false}),2000)
  }
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="glass-panel p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold ">
              ZenWallet
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white/[0.05] px-4 py-2 rounded-xl">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-white/70">Secure Environment</span>
          </div>
      </div>
      <MnemonicSection onCopy={copySeed} />
      <WalletSection onCopy = {copyWallet} />
      </div>
      {toast.visible && <Toast message={toast.message} visible={toast.visible} /> }
     </div>


  )
}
