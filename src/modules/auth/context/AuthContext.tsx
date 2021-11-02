import { useToast } from '@chakra-ui/toast';
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';
import { firebaseApp } from '@lib/firebase/firebase-sdk';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

const auth = getAuth(firebaseApp);

type Context = {
  user: User | null;
};
const Context = createContext<Context | undefined>(undefined);

type ProviderProps = {
  children: ReactNode | ReactNode[];
};
const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const toast = useToast();

  onAuthStateChanged(auth, setUser, () => {
    toast({
      title: 'Error.',
      description:
        'Fail to update user status. Please login again or refresh the page.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  });

  const value = useMemo(() => ({ user }), [user]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useAuthContext = (): Context => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('Must be use within AuthContext');
  }

  return context;
};

export { AuthProvider, useAuthContext };
