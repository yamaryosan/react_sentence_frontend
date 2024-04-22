import {Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import ContentsArea from './ContentsArea';
import {New, Home, Recommendations, Contact} from './MainContents';
import Article from './Article';
import ResultArticles from './ResultArticles';

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route index element={<ContentsArea children={Home} />} />
            <Route path="/new" element={<ContentsArea children={<New />} />}/>
            <Route path="/contact" element={<ContentsArea children={Contact} />}/>
            <Route path="/articles/:id" element={<ContentsArea children={<Article />} />}/>
            <Route path="/articles/search/:keyword" element={<ContentsArea children={<ResultArticles />} />}/>
        </Route>
    )
)

export default routes;