import {Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import MainContent from './MainContent';

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route index element={<MainContent name="トップ"/>} />
            <Route path="/recommendations" element={<MainContent name="おすすめ" />} />
            <Route path="/new" element={<MainContent name="新規" />} />
            <Route path="/contact" element={<MainContent name="お問い合わせ" />} />
        </Route>
    )
)

export default routes;