"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "admin" | "customer"
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUser(data.body.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Auth Error:", error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.body.token);
      setUser(data.body.user);
      if (data.body.user.role === "admin") router.push("/admin/dashboard");
      else router.push("/dashboard");
    } else {
      alert(data.message);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "admin" | "customer"
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      }
    );

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.body.token);
      setUser(data.body.user);
      if (data.body.user.role === "admin") router.push("/admin/dashboard");
      else router.push("/dashboard");
    } else {
      alert(data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
