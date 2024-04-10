type MainContentProps = {
    name: string;
};

function MainContent({name}: MainContentProps) {
    return (
        <div>
        <p>ページ名は{name}です</p>
        </div>
    );
}

export default MainContent;