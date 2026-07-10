import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { clearToken, getToken } from "../api/storage";

export interface AuthUser {
  publicId: string;
  name: string | null;
  pictureURL: string | null
}

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreUser() {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          clearToken();
          setUser(null);
          setLoading(false);
          return;
        }

        const data: AuthUser = await response.json();

        setUser(data);

      } catch (err) {
        clearToken();
        setUser(null);
      } finally {
        setLoading(false);
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