import React, { createContext } from 'react';
import { AuthProvider } from './AuthContext';

const AppContext = createContext({})

export function AppProvider({ children }: {children: React.ReactNode}) {
  return (
      <AppContext.Provider value={{}}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </AppContext.Provider>
  )
}
