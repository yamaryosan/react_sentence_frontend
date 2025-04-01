import { Button } from "@mui/material";
import { useState } from "react";
import { Typography } from "@mui/material";

type Sentence = {
    sentence: string;
    id: number;
};

type SentenceCardProps = {
    sentence: Sentence;
};

/**
 * 文章を表示するカード
 * @param sentence 文章
 */
export default function SentenceCard({ sentence }: SentenceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 200;
    const isLongSentence = sentence.sentence.length > maxLength;

    const toggleExpand = () => {
        setIsExpanded(true);
    };

    const renderText = (text: string) => {
        const lines = text.split("\n");
        return lines.map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div>
            <div>
                {isLongSentence ? (
                    isExpanded ? (
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                userSelect: "text",
                                textAlign: "left",
                                marginBottom: "1rem",
                            }}
                        >
                            {renderText(sentence.sentence)}
                        </Typography>
                    ) : (
                        <Button
                            variant="text"
                            sx={{
                                fontSize: "1rem",
                                color: "inherit",
                                textAlign: "left",
                                display: "block",
                                marginBottom: "1rem",
                                textTransform: "none",
                                userSelect: "text",
                            }}
                            onClick={toggleExpand}
                        >
                            {`${sentence.sentence.slice(0, maxLength)}...`}
                        </Button>
                    )
                ) : (
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            userSelect: "text",
                            textAlign: "left",
                            marginBottom: "1rem",
                        }}
                    >
                        {renderText(sentence.sentence)}
                    </Typography>
                )}
            </div>
        </div>
    );
}
