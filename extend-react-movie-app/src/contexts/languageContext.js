import React, { createContext, useState } from 'react';

const LanguageContext = createContext(null);

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en-US'); 

  const changeLanguage = (newLanguage) => {
    console.log(`Switching language to ${newLanguage}`);
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
