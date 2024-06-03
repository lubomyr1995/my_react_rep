import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";

import './index.css'
import {TriggerContextProvider} from "./hoc/TriggerContext.tsx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <TriggerContextProvider>
        <RouterProvider router={router}/>
    </TriggerContextProvider>
);
