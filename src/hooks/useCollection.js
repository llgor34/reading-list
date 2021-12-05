import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  where,
  orderBy,
  onSnapshot,
  query,
} from '@firebase/firestore';

export const useCollection = (coll, _query, _order) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // set up variables
  const q = useRef(_query).current;
  const o = useRef(_order).current;

  useEffect(() => {
    setError(null);
    setIsPending(true);
    let ref = collection(db, coll);

    if (q) {
      ref = query(ref, where(...q));
    }

    if (o) {
      ref = query(ref, orderBy(...o));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setIsPending(false);
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, [coll, o, q]);

  return { error, isPending, documents };
};
