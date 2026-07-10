import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { clearToken, getToken } from "../api/storage";
import { type AuthUser } from "../api/auth";
import { fetchLoggedInUser } from "../api/auth";


interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = "http://localhost:3000";

export function AuthProvider(
  { children }: { children: ReactNode }
) {
  const [user, setUser] = useState<AuthUser | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreUser() {
      const token = getToken();

      if (!token) {
        return;
      }

      try {
        // const response = await fetch(
        //   `${API_URL}/auth/me`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     }
        //   }
        // );

        const response: [boolean, AuthUser | null] = await fetchLoggedInUser(token);

        if (!response[0]) {
          clearToken();
          setUser(null);
          return;
        }

        if(response[1] == null) {
          clearToken();
          setUser(null);
          return;
        } else {
          setUser(response[1]);
        }
      } catch (err) {
        clearToken();
        setUser(null);
      }
    }

    restoreUser();
  }, []);


  function logout() {
    clearToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider..."
    );
  }

  return context;
}