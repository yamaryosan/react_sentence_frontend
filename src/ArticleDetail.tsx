import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect } from "react";
import { fetchArticleById } from "@/api/article";

import remarkGfm from "remark-gfm"; /* gfm(GitHub Flavored Markdown) */

import { Table, TableContainer, Paper } from "@mui/material";

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
    created_at: string;
    updated_at: string;
};

export default function ArticleDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const params = useParams<{ id: string }>();

    const {
        data: article,
        isLoading,
        isError,
    } = useQuery<Article | undefined>(["article", params.id], () =>
        fetchArticleById(parseInt(params.id || ""))
    );

    const originalDate = article?.updated_at;
    const formattedDate = originalDate
        ? new Date(originalDate).toLocaleString().split("T")[0]
        : "";

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (isError) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box sx={{ textAlign: "left", marginLeft: "0.5rem" }}>
            <h2>{article?.title}</h2>
            <ReactMarkdown
                components={{
                    code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                            <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code
                                style={{
                                    backgroundColor: "#374151",
                                    color: "white",
                                    padding: "0 0.25rem",
                                }}
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    pre({ children }) {
                        return (
                            <div
                                style={{
                                    whiteSpace: "pre",
                                    overflow: "auto",
                                    backgroundColor: "#374151",
                                    color: "white",
                                    fontSize: "0.875rem",
                                }}
                            >
                                {children}
                            </div>
                        );
                    },
                    table({ children }) {
                        return (
                            <TableContainer component={Paper}>
                                <Table>{children}</Table>
                            </TableContainer>
                        );
                    },
                    blockquote({ children }) {
                        return (
                            <blockquote
                                style={{
                                    padding: "0.5rem 0 0.5rem 0.5rem",
                                    margin: "1rem 0",
                                    backgroundColor: "#e8e8e8",
                                }}
                            >
                                {children}
                            </blockquote>
                        );
                    },
                    ul({ children }) {
                        return (
                            <ul
                                style={{
                                    listStyleType: "disc",
                                    listStylePosition: "inside",
                                    paddingBottom: "0.5rem",
                                }}
                            >
                                {children}
                            </ul>
                        );
                    },
                    ol({ children }) {
                        return (
                            <ol
                                style={{
                                    listStyleType: "decimal",
                                    listStylePosition: "inside",
                                    paddingBottom: "0.5rem",
                                }}
                            >
                                {children}
                            </ol>
                        );
                    },
                    h2({ children }) {
                        return (
                            <h2
                                style={{
                                    borderLeft: "4px solid #3b82f6",
                                    padding: "0.5rem 0 0.5rem 0.5rem",
                                    margin: "1rem 0",
                                    backgroundColor: "lightgray",
                                }}
                            >
                                {children}
                            </h2>
                        );
                    },
                    h3({ children }) {
                        return (
                            <h3
                                style={{
                                    borderLeft: "2px solid #3b82f6",
                                    padding: "0.5rem 0 0.5rem 0.5rem",
                                    margin: "1rem 0",
                                    backgroundColor: "lightgray",
                                }}
                            >
                                {children}
                            </h3>
                        );
                    },
                    h4({ children }) {
                        return (
                            <h4
                                style={{
                                    borderLeft: "1px solid #3b82f6",
                                    padding: "0.5rem 0 0.5rem 0.5rem",
                                    margin: "1rem 0",
                                    backgroundColor: "lightgray",
                                }}
                            >
                                {children}
                            </h4>
                        );
                    },
                }}
                remarkPlugins={[remarkGfm]}
            >
                {article?.content}
            </ReactMarkdown>
            <p>Updated at: {formattedDate}</p>
        </Box>
    );
}
