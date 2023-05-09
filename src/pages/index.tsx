import { NextPage } from 'next';
import { useState } from 'react';
import Login from '@/pages/login';
import Register from '@/pages/register';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { auth } from '@/firebase';
import api from "@/components/api";

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithProvider(provider, 'Google');
};

const signInWithApple = () => {
    const provider = new OAuthProvider('apple.com');
    signInWithProvider(provider, 'Apple');
};

const signInWithProvider = async (provider: OAuthProvider|GoogleAuthProvider, providerName: string) => {
    console.log('signing in with provider');
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User authenticated:", result.user);
        const idToken = await result.user.getIdToken();
        const email = result.user.email;
        const username = result.user.displayName;
        const deviceToken = providerName.concat('-').concat(result.user.uid);
        const userExistsResponse = await api.post('/api/auth/userExists', { email: email, username: username }, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },});

        if (userExistsResponse.data === true) {
            // Sign in the user
            const signInResponse = await api.post('/api/auth/signInProvider', { email: email, username: username, deviceToken: deviceToken }, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });
            console.log(signInResponse.data);
        } else {
            // Prompt for password
            const password = prompt('Please provide a password for your new account');
            const playerName = prompt('Please provide a player name for your new account');
            // Register the user
            const registerResponse = await api.post('/api/auth/register-firebase', { email: email, username: username, password: password, playerName: playerName }, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });
            console.log(registerResponse.data);
        }
    } catch (error) {
        console.error('Error signing in with provider:', error);
    }
};

const Home: NextPage = () => {
    const [mode, setMode] = useState<'register' | 'login'>('register');

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'register' ? 'login' : 'register'));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {mode === 'register' ? <Register /> : <Login />}
            <button
                onClick={toggleMode}
                className="mt-4 mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
                {mode === 'register' ? 'Switch to Login' : 'Switch to Register'}
            </button>
            <div className="flex items-center space-x-4">
                <button
                    onClick={signInWithGoogle}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                >
                    Sign in with Google
                </button>
                <button
                    onClick={signInWithApple}
                    className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-75"
                >
                    Sign in with Apple
                </button>
            </div>
        </div>
    );
};

export default Home;
