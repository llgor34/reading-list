import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc } from '@firebase/firestore';
import { db } from '../firebase/config';

export const useFirestore = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const ref = collection(db, 'books');

  // add document
  const addDocument = async (document) => {
    if (!document) return;
    setIsPending(true);
    setError(null);

    try {
      const res = addDoc(ref, document);
      setResponse(res);
    } catch (error) {
      setError(error.message);
    }
    setIsPending(false);
  };

  // delete document
  const deleteDocument = async (id) => {
    if (!id) return;
    setIsPending(true);
    setError(null);

    try {
      const res = deleteDoc(doc(db, 'books', id));
      setResponse(res);
    } catch (error) {
      setError(error.message);
    }
    setIsPending(false);
  };

  return { isPending, error, response, addDocument, deleteDocument };
};
