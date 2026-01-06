import React, { createContext, useContext, useEffect, useState } from 'react';
import { app_auth } from 'app/backend/fb_cfg';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getUser } from 'app/backend/db/user';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useUserAuthState = () => useContext(AuthContext);

export const UserAuthStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userImpl, setUserImpl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPfp, setNewPfp] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(app_auth, async (currentUser) => {
      if (currentUser !== null) {
        setUser(currentUser);
        const uimpl_res = await getUser(currentUser.uid);
        setUserImpl(uimpl_res);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setNewPfp(null)
  }, [location?.pathname])

  const forceReloadUserImpl = async () => {
    const uimpl_res = await getUser(user.uid);
    setUserImpl(uimpl_res);
  }

  const logout = async () => {
    await signOut(app_auth);
  };

  const getUserBP = () => {
    return user;
  }

  return (
    <AuthContext.Provider value={{ user, userImpl, forceReloadUserImpl, loading, logout, getUserBP, newPfp, setNewPfp }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
