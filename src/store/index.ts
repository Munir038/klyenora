/**
 * Global State Store (placeholder)
 *
 * Choose your preferred state management:
 *   - Zustand (recommended — lightweight, hooks-first)
 *   - Redux Toolkit
 *   - React Context + useReducer
 *
 * This file is scaffolded for Zustand. Install with:
 *   npm install zustand
 */

// import { create } from 'zustand';
// import { AuthState, User } from '../types/models';
//
// interface AppStore extends AuthState {
//   setUser: (user: User | null) => void;
//   setToken: (token: string | null) => void;
//   setLoading: (loading: boolean) => void;
//   logout: () => void;
// }
//
// export const useAppStore = create<AppStore>((set) => ({
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   isLoading: true,
//
//   setUser: (user) => set({ user, isAuthenticated: !!user }),
//   setToken: (token) => set({ token }),
//   setLoading: (isLoading) => set({ isLoading }),
//   logout: () => set({ user: null, token: null, isAuthenticated: false }),
// }));

export {};
