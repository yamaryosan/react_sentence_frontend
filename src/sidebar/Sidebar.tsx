import AdminCheck from "./AdminCheck";
import SidebarNewArticleItems from "./SidebarNewArticleItems";
import CategoriesIndex from "./CategoriesIndex";

export default function Sidebar() {
    return (
        <div>
            <AdminCheck />
            <SidebarNewArticleItems />
            <CategoriesIndex />
        </div>
    )
};