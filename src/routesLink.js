import {Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import ContentsArea from './ContentsArea';
import {New, Home, Recommendations, Contact} from './MainContents';

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route index element={<ContentsArea children={Home} />} />
            <Route path="/recommendations" element={<ContentsArea children={Recommendations} />}/>
            <Route path="/new" element={<ContentsArea children={<New />} />}/>
            <Route path="/contact" element={<ContentsArea children={Contact} />}/>
        </Route>
    )
)

export default routes;