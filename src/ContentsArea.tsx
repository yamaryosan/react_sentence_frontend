type ContentsAreaProps = {
    name: string;
};

function ContentsArea({name}: ContentsAreaProps) {
    return (
        <div>
        <p>ページ名は{name}です</p>
        </div>
    );
}

function Home() {
    return <ContentsArea name="Home" />;
}

function Recommendations() {
    return <ContentsArea name="Recommendations" />;
}

function New() {
    return <ContentsArea name="New" />;
}

function Contact() {
    return <ContentsArea name="Contact" />;
}

export {Home, Recommendations, New, Contact};