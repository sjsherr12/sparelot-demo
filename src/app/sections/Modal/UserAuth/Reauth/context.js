import React, { createContext, useContext, useState, useCallback } from 'react';

const ReauthContext = createContext();

export const useReauth = () => useContext(ReauthContext);

export const ReauthProvider = ({ children }) => {
  const [emailCredential, setEmailCredential] = useState(null);
  const [isReauthenticated, setIsReauthenticated] = useState(false);
  
  const [reauthPromise, setReauthPromise] = useState(null);

  const requestReauth = useCallback(() => {
    return new Promise((resolve, reject) => {
      setReauthPromise({ resolve, reject });
    });
  }, []);

  const completeReauth = useCallback((credential) => {
    if (reauthPromise) {
      setEmailCredential(credential);
      setIsReauthenticated(true);
      reauthPromise.resolve();
      setReauthPromise(null);
    }
  }, [reauthPromise]);

  const failReauth = useCallback((error) => {
    if (reauthPromise) {
      reauthPromise.reject(error);
      setReauthPromise(null);
    }
  }, [reauthPromise]);

  return (
    <ReauthContext.Provider value={{ emailCredential, isReauthenticated, requestReauth, completeReauth, failReauth }}>
      {children}
    </ReauthContext.Provider>
  );
};
