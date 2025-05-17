// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import * as api from '../services/api';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null; // Replace 'any' with your UserProfile type from api.ts if you have one
  loading: boolean;
  login: typeof api.signIn;
  register: typeof api.signUp;
  logout: typeof api.signOut;
  fetchProfile: () => Promise<void>; 
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null); // Replace 'any' with UserProfile type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      setLoading(false);
    };

    getInitialSession();

    const { data: authListener } = api.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
      }
      if (_event === 'INITIAL_SESSION') {
        // setLoading(false); // Already handled by getInitialSession
      } else {
        setLoading(false); 
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await api.getUserProfile(userId);
    if (error) {
      console.error('Error fetching user profile:', error);
      setProfile(null);
    } else {
      setProfile(data);
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    login: api.signIn,
    register: api.signUp,
    logout: api.signOut,
    fetchProfile: async () => { // Expose fetchProfile if needed elsewhere
      if(user) await fetchUserProfile(user.id)
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};