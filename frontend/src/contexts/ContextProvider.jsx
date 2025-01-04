import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {}
})

export const ContextProvider = ({children}) => {
  // Retrieve user data from localStorage if available
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER_DATA')) || {});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');

  const setToken = (token) => {
    console.log("menyetel token");
    console.log(token);
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  // Update setUser function to also update localStorage
  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('USER_DATA', JSON.stringify(userData));
    } else {
      localStorage.removeItem('USER_DATA');
    }
  }

  const setNotification = message => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser: updateUser,
      token,
      setToken,
      notification,
      setNotification
    }}>
      {children}
    </StateContext.Provider>
  );
}

// With this change, the user data will be stored in localStorage and will persist across page reloads. Make sure to call updateUser instead of setUser when updating the user data.

export const useStateContext = () => useContext(StateContext);