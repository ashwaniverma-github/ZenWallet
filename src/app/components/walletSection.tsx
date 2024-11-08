'use client'
import { ethers } from 'ethers';
import {WalletIcon, Plus, Copy} from 'lucide-react';
import { useFormContext } from '../lib/formContext';

interface Wallet {
    address:string
}

interface WalletSectionProps {
  onCopy:(address:string)=>void
}

function WalletSection({onCopy}:WalletSectionProps){
    const {wallets , setWallets , seedPhrase} = useFormContext() as {
        wallets: Wallet[];
        setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
        seedPhrase: string | undefined;
      };
    
      const generateWallet = () => {
        if (!seedPhrase) return;

        try {
            const index = wallets.length;
            const path = `m/44'/60'/0'/0/${index}`;

            const derivedWallet = ethers.HDNodeWallet.fromMnemonic(
                ethers.Mnemonic.fromPhrase(seedPhrase),
                path
            );

            const newWallet = {
                address: derivedWallet.address,
                path: path
            };

            setWallets(prevWallets => [...prevWallets, newWallet]);
        } catch (error) {
            console.error('Error generating wallet:', error);
        }
    };
    
    return (
        <div className="glass-panel p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
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
            className="w-full sm:w-auto btn btn-success flex items-center justify-center gap-2"
            onClick={generateWallet} 
            title={!seedPhrase?'Generate a recovery key first' :'Generate a new wallet'}>
              <Plus/>
              New wallet
            </button>
          </div>

          <div className='space-y-4 p-4 sm:p-6 bg-slate-400/20 rounded-lg'>
            {wallets.length>0 ?(
                <div className='text-sm sm:text-md font-mono space-y-2'>
                    {wallets.map((wallet:Wallet,index:number)=>(
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0' key={index}>
                            <div className="break-all">{wallet.address}</div>
                            <Copy onClick={()=>onCopy(wallet.address)} className='text-gray-400 cursor-pointer ml-auto' width={20} />
                        </div>
                    ))}
                </div>
            ):(
                <div className='text-center py-8 sm:py-16 px-4 sm:px-6'>
                    <div className='flex items-center justify-center w-14 h-14 rounded-2xl mx-auto bg-slate-800/50 mb-4'>
                        <WalletIcon className='w-8 h-8' />
                    </div>
                    <h1>No Wallets yet</h1>
                    <p className='text-gray-400 max-w-sm mx-auto'>
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