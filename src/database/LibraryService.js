import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, APP_ID } from '../firebase';

export const saveBook = async (userId, bookData, profile, publish = false) => {
  const privatePath = `artifacts/${APP_ID}/users/${userId}/books`;
  try {
    const bookPayload = {
      ...bookData,
      createdAt: new Date().toISOString(),
      ownerId: userId,
      ownerName: profile?.displayName || 'Anonymous Reader',
      ownerAvatar: profile?.avatar || '📖'
    };

    const docRef = await addDoc(collection(db, privatePath), bookPayload);
    
    if (publish) {
      const publicPath = `artifacts/${APP_ID}/public/data/books`;
      await addDoc(collection(db, publicPath), {
        ...bookPayload,
        publishedAt: serverTimestamp(),
        privateRef: docRef.id
      });
    }
    
    return docRef.id;
  } catch (error) {
    console.error("Error saving book:", error);
    throw error;
  }
};

export const useLibrary = (userId) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const path = `artifacts/${APP_ID}/users/${userId}/books`;
    const q = query(collection(db, path), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksData);
      setLoading(false);
    }, (error) => {
      console.error("Library Subscription Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { books, loading };
};
