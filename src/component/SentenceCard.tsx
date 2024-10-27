import { Button } from '@mui/material';
import { useState } from 'react';

type Sentence = {
    sentence: string;
    id: number;
}

type SentenceCardProps = {
    sentence: Sentence;
}

/**
 * 文章を表示するカード
 * @param sentence 文章
 */
export default function SentenceCard({sentence}: SentenceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 200;
    const isLongSentence = sentence.sentence.length > maxLength;

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            {isLongSentence && (
                <Button variant='text' sx={{ fontSize: '1rem', color: 'inherit', textAlign: 'left', display: 'block', marginBottom: '1rem' }} onClick={toggleExpand}>
                    {!isExpanded
                    ? `${sentence.sentence.slice(0, maxLength)}...`
                    : sentence.sentence.split('\n').map((line, index) => (
                        <span key={index}>{line}<br /></span>
                    ))
                    }
                </Button>
            )}
            {!isLongSentence && (
                <p style={{ marginBottom: '1rem' }}>{sentence.sentence}</p>
            )}
        </div>
    );
}
