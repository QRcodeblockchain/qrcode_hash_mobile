import React, {createContext, useState, useEffect} from 'react';
import LocalizedStrings from 'react-native-localization';
import LanguageContext from './LanguageContext';
import strings from '../utilies/Language';

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('fr');

  const handleLanguageChange = newLanguage => {
    strings.setLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{language, handleLanguageChange, strings}}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
