import { useState, useEffect } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';

export default function Home() {
  const { user } = useAuthContext();
  const [books, setBooks] = useState(null);
  const { documents, error, isPending } = useCollection('books', [
    'uid',
    '==',
    user.uid,
  ]);

  useEffect(() => {
    if (documents) {
      setBooks(documents);
    }
  }, [documents]);

  return (
    <div className="App">
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
