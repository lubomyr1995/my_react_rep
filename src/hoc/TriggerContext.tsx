import {createContext, useState, ReactNode, FC} from "react";

export interface TriggerContextType {
    trigger: boolean;
    changeTrigger: () => void;
}

const TriggerContext = createContext<TriggerContextType | null>(null);

interface TriggerContextProviderProps {
    children: ReactNode;
}

const TriggerContextProvider: FC<TriggerContextProviderProps> = ({children}) => {
    const [trigger, setTrigger] = useState<boolean>(false);

    const changeTrigger = () => {
        setTrigger(prev => !prev);
    };

    return (
        <TriggerContext.Provider value={{trigger, changeTrigger}}>
            {children}
        </TriggerContext.Provider>
    );
};

export {
    TriggerContext,
    TriggerContextProvider
};