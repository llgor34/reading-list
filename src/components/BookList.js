import { useFirestore } from '../hooks/useFirestore';

export default function BookList({ books }) {
  const { deleteDocument } = useFirestore();

  const handleClick = async (id) => {
    deleteDocument(id);
  };

  return (
    <div className="book-list">
      <ul>
        {books.map((book) => (
          <li key={book.id} onClick={() => handleClick(book.id)}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
