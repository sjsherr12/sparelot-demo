import React, { createContext, useContext, useState } from 'react';
import AlertComponent from '.'; // Ensure this path is correct

// Create a Context for the Alert
const AlertContext = createContext();

// Custom hook to use the Alert Context
export const useAlertState = () => useContext(AlertContext);

// Alert Provider component
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  // Function to open the alert
  const openAlert = (message, color) => {
    setAlert({message, color});
  };

  // Function to close the alert
  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ openAlert, closeAlert }}>
      {children}
      <div 
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          width:'calc(100% - 20px)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px', // Space between alerts
        }}
      >
        <AlertComponent
          message={alert?.message}
          color={alert?.color}
          onClose={() => setAlert(null)}
        />
      </div>
    </AlertContext.Provider>
  );
};