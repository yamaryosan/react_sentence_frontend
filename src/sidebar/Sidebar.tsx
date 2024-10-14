import SidebarRandomArticleItems from "@/sidebar/SidebarRandomArticleItems";
import CategoriesIndex from "@/sidebar/CategoriesIndex";

export default function Sidebar() {
    return (
        <div>
            <CategoriesIndex />
            <SidebarRandomArticleItems />
        </div>
    )
};