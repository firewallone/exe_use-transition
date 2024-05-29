import { Fragment, memo, useEffect, useState, useTransition } from 'react';
import { text } from './text';

const BookText = ({ highlight }: { highlight: string }) => {
  if (highlight.length < 2) return <>{text}</>;

  const content = text.split(highlight).map((textEntry, index, arr) => (
    <Fragment key={index}>
      {textEntry}
      {index < arr.length - 1 && (
        <span style={{ background: 'yellow' }}>{highlight}</span>
      )}
    </Fragment>
  ));

  return <>{content}</>;
};

const MemoedBookText = memo(BookText);

function App() {
  const [query, setQuery] = useState('');
  const [highlight, setHightlight] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log(query, highlight);
  }, [query, highlight]);

  return (
    <div>
      <input
        onChange={({ target }) => {
          setQuery(target.value);
          startTransition(() => {
            setHightlight(target.value);
          });
        }}
        value={query}
        type="text"
        style={{ fontSize: '3rem' }}
      />
      <br />
      {isPending ? <p>Loading...</p> : <MemoedBookText highlight={query} />}
    </div>
  );
}

export default App;
