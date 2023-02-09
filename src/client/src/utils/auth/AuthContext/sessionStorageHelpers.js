import { useEffect } from "react";

export const getSessionUser = () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null
  }
  
export const getSessionIsLoggedIn = () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn ?  JSON.parse(isLoggedIn) : false;
  }
  
export const getIsActiveSession = () => {
    const isActiveSession = sessionStorage.getItem('isActiveSession');
    return isActiveSession ? JSON.parse(isActiveSession) : false;
  }
  
export const getIsDenied = () => {
    const isDenied = sessionStorage.getItem('isDenied');
    return isDenied ? JSON.parse(isDenied) : false;
}

export const useSessionStorage = (user, isLoggedIn, isActiveSession, isDenied, socket) => {
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
        if (user) {
          socket.emit('login', user.uid);
        }
      }, [user]);
  
    useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    }, [isLoggedIn]);

    useEffect(() => {
        sessionStorage.setItem('isActiveSession', isActiveSession ? 'true' : 'false');
      }, [isActiveSession]);
  
    useEffect(() => {
    sessionStorage.setItem('isDenied', isDenied ? 'true' : 'false');
    }, [isDenied]);
}