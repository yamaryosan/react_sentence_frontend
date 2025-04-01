import {
    Route,
    createHashRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "@/App";
import ContentsArea from "@/ContentsArea";
import { All, Home, Category } from "@/MainContents";
import ArticleDetail from "@/ArticleDetail";
import ResultArticles from "@/ResultArticles";
import ResultSentences from "@/ResultSentences";
import AdminAuthProvider from "@/upload/AdminAuthProvider";

const routes = createHashRouter(
    createRoutesFromElements(
        <Route element={<App />}>
            <Route index element={<ContentsArea children={<Home />} />} />
            <Route
                path="/allArticles"
                element={<ContentsArea children={<All />} />}
            />
            <Route
                path="/admin"
                element={<ContentsArea children={<AdminAuthProvider />} />}
            />
            <Route
                path="/articles/:id"
                element={<ContentsArea children={<ArticleDetail />} />}
            />
            <Route
                path="/articles/search/:keyword"
                element={<ContentsArea children={<ResultArticles />} />}
            />
            <Route
                path="/sentences/search/:keyword"
                element={<ContentsArea children={<ResultSentences />} />}
            />
            <Route
                path="/categories/:category"
                element={<ContentsArea children={<Category />} />}
            />
        </Route>
    )
);

export default routes;
