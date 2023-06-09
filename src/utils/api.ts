import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useEffect, useRef, useState } from "react";

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
}, Promise.reject)

export default api;

export function useGetAccessToken() {
  const [user] = useAuthState(auth);
  const idTokenRef = useRef<string>()
  const [isTokenReady, setIsTokenReady] = useState(false);
  
  useEffect(() => {
    if (!user) {
      setIsTokenReady(false)
    } else {
      user.getIdToken()
      .then(idToken => {
        idTokenRef.current = idToken
        return axios.post('/api/auth/userExists', {
          email: user.email
        }, {
          headers: {
            "Authorization":  `Bearer ${idTokenRef.current}`
          }
        })
      })
      .then(({data: userExists}) => {
        if (userExists) return
        return axios.post('/api/auth/register-firebase', {
          email: user.email,
          username: user.email,
          password: '111',
          playerName: 'JD'
        }, {  
          headers: {
            "Authorization":  `Bearer ${idTokenRef.current}`
          }
        })
        .then(response => {
          console.log('register new user:', response)
        })
      })
      .then(() => {
        return axios.post('/api/auth/signIn', {
          email: user.email,
          username: user.email,
          password: '111',
          playerName: 'JD'
        }, {  
          headers: {
            "Authorization":  `Bearer ${idTokenRef.current}`
          }
        })
      })
      .then(({data: {accessToken, refreshToken}}) => {
        localStorage.setItem('accessToken', accessToken)
        setIsTokenReady(true)
      })
    }
  }, [user]);

  return [isTokenReady] as const;
}