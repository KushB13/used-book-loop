import { db, APP_ID } from '../firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  doc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

const SWAPS_PATH = `artifacts/${APP_ID}/swaps`;

// Create a new swap request
export const submitSwapRequest = async (senderId, senderProfile, recipientId, book) => {
  const swapData = {
    bookId: book.id,
    bookTitle: book.title,
    bookCover: book.coverUrl,
    senderId,
    senderName: senderProfile?.displayName || 'Unknown Explorer',
    recipientId,
    status: 'pending', // pending, accepted, declined
    createdAt: serverTimestamp()
  };

  return addDoc(collection(db, SWAPS_PATH), swapData);
};

// Hook to listen for swaps related to the user
export const useSwaps = (userId) => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Listen for requests SENT BY the user or RECEIVED BY the user
    const q = query(
      collection(db, SWAPS_PATH),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allSwaps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Filter in JS to avoid complex composite indexes during initial build
      const mySwaps = allSwaps.filter(s => s.senderId === userId || s.recipientId === userId);
      setSwaps(mySwaps);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  return { swaps, loading };
};

// Accept or Decline a swap
export const handleSwapAction = async (swapId, action) => {
  const swapRef = doc(db, SWAPS_PATH, swapId);
  return updateDoc(swapRef, { status: action });
};
