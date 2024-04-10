type MainContentsProps = {
    name: string;
};

function MainContents({name}: MainContentsProps) {
    return (
        <div>
        <p>ページ名は{name}です</p>
        </div>
    );
}

export default MainContents;