'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Wallet {
    address: string;
}


interface FormProviderProps {
    children: ReactNode;
}


interface FormContextType {
    seedPhrase: string;
    setSeedPhrase: React.Dispatch<React.SetStateAction<string>>;
    wallets: Wallet[];
    setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: FormProviderProps) => {
    const [seedPhrase, setSeedPhrase] = useState<string>('');
    const [wallets, setWallets] = useState<Wallet[]>([]);

    return (
        <FormContext.Provider value={{ seedPhrase, setSeedPhrase, wallets, setWallets }}>
            {children}
        </FormContext.Provider>
    );
};

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("FormContext must be used within a FormProvider");
    }

    return context;
}
