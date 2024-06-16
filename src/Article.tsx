import {useQuery} from 'react-query';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect } from 'react';

import remarkGfm from 'remark-gfm'; // gfm(GitHub Flavored Markdown)

import { Table, TableContainer, Paper } from '@mui/material';

type Article = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
};

const fetchArticle = async (id: string) => {
    if (!id) {
        throw new Error('IDが不正です');
    }
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/articles/${id}`);
    if (!response.ok) {
        throw new Error('記事が見つかりません');
    }
    return response.json() as Promise<Article>;
};

export default function Article() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const params = useParams<{id: string}>();

    const {data: article, isLoading, isError} = useQuery<Article, Error>(
        ['article', params.id],
        () => fetchArticle(params.id ?? ''),
    );

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (isError) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box sx={{
            textAlign: 'left'}}>
            <h1>{article?.title}</h1>
            <ReactMarkdown 
            components={{
                code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    ) : (
                    <code className="inline-code" {...props}>
                        {children}
                    </code>
                    );
                },
                table({ children }) {
                    return (
                    <TableContainer component={Paper}>
                        <Table>{children}</Table>
                    </TableContainer>
                    );
                },
                ul({ children }) {
                    return <ul className="list-disc list-inside pb-2">{children}</ul>;
                },
                ol({ children }) {
                    return <ol className="list-decimal list-inside pb-2">{children}</ol>;
                },
            }}
            remarkPlugins={[remarkGfm]}
            >
                {article?.content}
            </ReactMarkdown>
            <p>{article?.updated_at}</p>
        </Box>
    );
}