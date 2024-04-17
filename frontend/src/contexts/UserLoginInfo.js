import React, { useState, createContext } from 'react';

const UserLoginInfoContext = createContext({
  userToken: null,
  setuserToken: () => {},
});

const UserLoginInfoProvider = ({ children }) => {
  const [userToken, setuserToken] = useState(null);

  const value = { userToken, setuserToken };
  return (
    <UserLoginInfoContext.Provider value={value}>
      {children}
    </UserLoginInfoContext.Provider>
  );
};

export { UserLoginInfoContext, UserLoginInfoProvider };
