import React from 'react';
export type User = {
  email: string;
};
const defaultUser: User = { email: '' };
const userContext = React.createContext(defaultUser);

export { userContext };
