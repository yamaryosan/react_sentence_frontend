import AdminCheck from "./AdminCheck";
import SidebarNewArticleItems from "./SidebarNewArticleItems";
import SidebarRandomArticleItems from "./SidebarRandomArticleItems";
import CategoriesIndex from "./CategoriesIndex";

export default function Sidebar() {
    return (
        <div>
            <AdminCheck />
            <SidebarRandomArticleItems />
            <CategoriesIndex />
        </div>
    )
};