import React, { useState, createContext } from 'react';

const initialUserState = {
  email: null,
  name: null,
  password: null,
  birth: null,
  gender: null,
  height: null,
  weight: null,
  bmi: null,

  pregnant: false,
  breastfeeding: false,
  diabetes: false,
  obesity: false,
  osteoporosis: false,
  constipation: false,
  anaemia: false,
  urinarystone: false,
  gout: false,
  vegan: false,

  role: 'USER',
};

const UserContext = createContext({
  user: { ...initialUserState },
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ ...initialUserState });

  const updateUserInfo = (updates) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updates,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
