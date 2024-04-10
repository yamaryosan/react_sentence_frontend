import {Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import {Home, Recommendations, New, Contact} from './ContentsArea';

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />}/>
            <Route path="/new" element={<New />}/>
            <Route path="/contact" element={<Contact />}/>
        </Route>
    )
)

export default routes;