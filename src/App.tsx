import React from 'react';
import { useQuery } from 'react-query';
import './App.css';

// データ取得用関数
const fetchSentence = async () => {
  const res = await fetch('http://localhost/api/sentences');
  if (!res.ok) {
    throw new Error('サーバエラー');
  }
  return res.json() as Promise<Sentences>;
};

type Sentence = {
  id: number;
  sentence: string;
  created_at: string;
  updated_at: string;
};

type Sentences = Array<Sentence>;

function App() {
  // データを取得
  const { data, isLoading, isError, error } = useQuery<Sentences, Error>('sentence', fetchSentence);
  
  if (isLoading) {
    return (
      <h1>読み込み中...</h1>
    );
  }

  if (isError && error) {
    return (
      <h1>エラーが発生しました: {error.message}</h1>
    );
  }
  return (
    <>
      <ul>
        {data?.map(sentence => (
          <li key={sentence.id}>
            {sentence.sentence.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
