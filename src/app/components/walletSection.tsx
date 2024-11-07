'use client'
import { ethers } from 'ethers';
import {WalletIcon, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useFormContext } from '../lib/formContext';

interface Wallet {
    address:string
}

function WalletSection(){
    const {wallets , setWallets , seedPhrase} = useFormContext() as {
        wallets: Wallet[];
        setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
        seedPhrase: string | undefined;
      };
    const generateWallet = async ()=>{
        if(!seedPhrase)return;
        const wallet = ethers.Wallet.fromPhrase(seedPhrase)
        const newWallet = {
            address:wallet.address
        }
        setWallets((prevWallet)=>[...prevWallet , newWallet])       
    }
    useEffect(()=>{
        console.log(wallets)
    },[wallets])
    return (
        <div className="glass-panel p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center ring-4 ring-amber-500/10">
                <WalletIcon className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="font-semibold text-xl">Your wallets</h1>
                <p className="text-gray-400 text-sm">
                    {wallets.length ? `Managing ${wallets.length} wallet${wallets.length === 1?'':'s'} `
                    :'start by creating your first wallet' }
                </p>
              </div>
            </div>
            <button  
            className=" btn btn-success flex items-center gap-2"
            onClick={generateWallet} 
            title={!seedPhrase?'Generate a recovery key first' :'Generate a new wallet'}>
              <Plus/>
              New wallet
            </button>
          </div>

          <div className='space-y-4' >
            {wallets.length>0 ?(
                <div>
                    {wallets.map((wallet:Wallet,index:number)=>(
                        <div key={index}>{wallet.address}</div>
                    ))}
                </div>
            ):(
                <div className='text-center py-16 px-6' >
                    <div className='flex items-center justify-center w-14 h-14 rounded-2xl mx-auto bg-slate-800/50 mb-4' >
                        <WalletIcon className='w-8 h-8' />
                    </div>
                    <h1>No Wallets yet</h1>
                    <p className='text-gray-400 max-w-sm mx-auto' >
                        {seedPhrase?"Click 'New Wallet' above to create your first wallet"
                        :"Generate a recovery phrase to create a wallet"}
                    </p>
                </div>
            )}
          </div>
        </div>
        
      );
}

export default WalletSection;