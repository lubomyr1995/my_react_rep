import {useContext} from "react";
import {TriggerContext, TriggerContextType} from "../hoc/TriggerContext.tsx";

const useTriggerContext = (): TriggerContextType => {
    const context = useContext(TriggerContext);
    if (context === null) {
        throw new Error("useTriggerContext must be used within a TriggerContextProvider");
    }
    return context;
};

export {
    useTriggerContext
};