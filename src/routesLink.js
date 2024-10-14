import {Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '@/App';
import ContentsArea from '@/ContentsArea';
import {All, Home, Contact, Category} from '@/MainContents';
import Article from '@/Article';
import ResultArticles from '@/ResultArticles';
import ResultSentences from '@/ResultSentences';
import Upload from '@/upload/Upload';

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route index element={<ContentsArea children={<Home />} />} />
            <Route path="/allArticles" element={<ContentsArea children={<All />} />}/>
            <Route path="/contact" element={<ContentsArea children={<Contact />} />}/>
            <Route path="/articles/:id" element={<ContentsArea children={<Article />} />}/>
            <Route path="/articles/search/:keyword" element={<ContentsArea children={<ResultArticles />} />}/>
            <Route path="/sentences/search/:keyword" element={<ContentsArea children={<ResultSentences />} />}/>
            <Route path="/upload" element={<ContentsArea children={<Upload />} />}/>
            <Route path="/categories/:category" element={<ContentsArea children={<Category />} />}/>
        </Route>
    )
)

export default routes;