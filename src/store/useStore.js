import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const useStore = create(subscribeWithSelector((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  swaps: [],
  
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setSwaps: (swaps) => set({ swaps }),

  init: () => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      set({ user, loading: user ? true : false });
      if (!user) {
        set({ profile: null, swaps: [] });
      }
    });

    let unsubProfile = () => {};
    
    // Subscribe to profile changes when user is logged in
    const unsubStore = useStore.subscribe(
      (state) => state.user,
      (user) => {
        unsubProfile();
        if (user) {
          const path = `artifacts/${import.meta.env.VITE_APP_ID}/users/${user.uid}/profile/user_data`;
          unsubProfile = onSnapshot(doc(db, path), (docSnap) => {
            if (docSnap.exists()) {
              set({ profile: docSnap.data(), loading: false });
            } else {
              set({ profile: { displayName: '', bio: '', avatar: '📖' }, loading: false });
            }
          });
        }
      },
      { fireImmediately: true }
    );

    return () => {
      unsubAuth();
      unsubStore();
      unsubProfile();
    };
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null, profile: null, swaps: [], loading: false });
  }
})));
