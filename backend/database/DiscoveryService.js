import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, APP_ID } from '../firebase';

export const useDiscovery = () => {
  const [discoveryBooks, setDiscoveryBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = `artifacts/${APP_ID}/public/data/books`;
    const q = query(collection(db, path), orderBy("publishedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiscoveryBooks(booksData);
      setLoading(false);
    }, (error) => {
      console.error("Discovery Subscription Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { discoveryBooks, loading };
};
