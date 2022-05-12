import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStateChange = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return authStateChange;
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
