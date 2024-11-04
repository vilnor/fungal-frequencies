import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChartView from './views/ChartView';
import TableView from './views/TableView';

// This is the main navigation router for the application.
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <ChartView/>,
            },
            {
                path: '/table',
                element: <TableView/>,
            },
        ],
    },
    {
        path: '/monitoring',
        element: <App/>,
        children: [
            {
                path: '/monitoring/',
                element: <ChartView isMonitoring/>,
            },
            {
                path: '/monitoring/table',
                element: <TableView isMonitoring/>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
);
