import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, APP_ID } from '../firebase';

export const useProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const path = `artifacts/${APP_ID}/users/${userId}/profile/user_data`;
    const docRef = doc(db, path);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        setProfile({ displayName: '', bio: '', avatar: '📖' });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { profile, loading };
};

export const updateProfile = async (userId, data) => {
  const path = `artifacts/${APP_ID}/users/${userId}/profile/user_data`;
  const docRef = doc(db, path);
  try {
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Profile Update Error:", error);
    throw error;
  }
};
