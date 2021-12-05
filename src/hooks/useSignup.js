import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  const signup = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      dispatch({ type: 'LOGIN', payload: res.user });
    } catch (error) {
      setError(error.message);
    }

    if (!isCancelled) {
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
