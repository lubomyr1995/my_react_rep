import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";

import './index.css'
import router from "./router.tsx";
import {store} from "./store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)