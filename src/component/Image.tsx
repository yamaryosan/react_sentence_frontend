type props = {
    imagePath: string;
}

export default function Image({imagePath}: props) {
    return (
        <img src={imagePath} alt="thumbnail" style={{ objectFit: 'contain', height: '100px' }}/>
    )
}