import { AxiosResponse } from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';


type AuthContextTypes = {
  isAuthenticated: boolean;
  signIn(signRequest: SignRequest): Promise<void>;
  user: User | null;
};

export type SignRequest = {
  username: string;
  email: string;
  password: string;
};

type SignResponse = {
  user: User;
  access_token: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const { 'instagram-tools:token': token } = parseCookies()

    if(token) {
      api.get('token').then(response => {
        console.log(response.data);
        setUser(response.data)
      }).catch(err => alert('deu erro'))
    }

  },[])



  async function signIn({ username, email, password }: SignRequest) {
    const { data } = await api.post<
      SignResponse,
      AxiosResponse<SignResponse>,
      SignRequest
    >("signin", {
      username,
      email,
      password
    });

    const { access_token, user } = data;

    setCookie(undefined, 'instagram-tools:token', access_token,{
      maxAge: 60 * 60 * 24 // 24 hours
    })

    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    setUser(user)

    router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { isAuthenticated,signIn, user } = useContext(AuthContext);


  return {
    isAuthenticated,
    signIn,
    user
  }

}
