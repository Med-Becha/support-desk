import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [chekingStatus, setChekingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
    setChekingStatus(false);
  }, [user]);
  return { userLoggedIn, chekingStatus };
};
