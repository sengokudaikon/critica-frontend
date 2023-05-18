import * as React from "react";
import { useState, useContext } from "react";
import AuthForm from "@/components/AuthForm";
import ProfileForm from "@/components/ProfileForm";
import { auth } from "@/firebase";
import {signInWithPopup, OAuthProvider, GoogleAuthProvider, UserCredential} from "firebase/auth";
import { Context } from "@/context/authContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSnackbar } from "notistack";
import Router from "next/router";
import Head from "next/head";
import api from "../components/api";
import profileForm from "@/components/ProfileForm";

const AuthPage: React.FC = () => {
    const [formMode, setFormMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [signedInWithProvider, setSignedInWithProvider] = useState(false);
    const [isProfileFormVisible, setProfileFormVisible] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const context = useContext(Context);

    const handleEmailChange = (email: string) => {
        setEmail(email);
    };

    const handlePasswordChange = (password: string | undefined) => {
        password != undefined ? setPassword(password) : setPassword("");
    };

    const handleUsernameChange = (username: string) => {
        setUsername(username);
    };

    const handlePlayerNameChange = (playerName: string) => {
        setPlayerName(playerName);
    };

    const handleContinue = async () => {
        try {
            const response = await api.post('/api/auth/userExists',
                JSON.stringify({ email: email }),
            );
            const userExists = await response.data;
            try {

            } catch (error: any) {
                enqueueSnackbar(error.message, { variant: "error", autoHideDuration: 1500 });
            }

            if (userExists) {
                let result = await signInWithEmailAndPassword(auth, email, password);
                signIn(result);
            } else {
                setProfileFormVisible(true);
            }
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: "error", autoHideDuration: 1500 });
        }
    };

    const handleRegister = async (username: string, playerName: string, password: string, isAgree: boolean = true) => {
        if (isAgree) {
            try {
                let result = await createUserWithEmailAndPassword(auth, email, password);
                console.log(result.user.getIdToken())
                localStorage.setItem("user", JSON.stringify(await result.user.getIdToken()));
                await api.post('/api/auth/register-firebase',
                    JSON.stringify({ email: email, password: password, username: username, playerName: playerName }),
                );
                enqueueSnackbar("Successfully registered!", { variant: "success", autoHideDuration: 1700 });
                context.dispatch({ type: "LOGIN", payload: result.user });
                Router.push("/secret");
            } catch (error: any) {
                enqueueSnackbar(error.message, { variant: "error", autoHideDuration: 1500 });
            }
        } else {
            enqueueSnackbar("You need to agree to the terms", { variant: "error", autoHideDuration: 1500 });
        }
    };

    const signInWithProvider = async (provider: OAuthProvider | GoogleAuthProvider, providerName: string) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;
            const username = result.user.displayName;

            email ? setEmail(email) : setEmail("");
            username ? setUsername(username) : setUsername("");
            setFormMode('register');
            setSignedInWithProvider(true);
            localStorage.setItem("user", JSON.stringify(await result.user.getIdToken()));
            setProfileFormVisible(true);
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: "error", autoHideDuration: 1500 });
        }
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithProvider(provider, 'Google');
    };

    const signInWithApple = () => {
        const provider = new OAuthProvider('apple.com');
        signInWithProvider(provider, 'Apple');
    };

    const signIn = async (result: UserCredential) => {
        try {
            localStorage.setItem("user", JSON.stringify(await result.user.getIdToken()));
            const response = await api.post('/api/auth/signIn', JSON.stringify({ email: email, username: null, password: password }),);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            context.dispatch({ type: "LOGIN", payload: result.user });
            Router.push("/secret");
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: "error", autoHideDuration: 1500 });
        }
    };

    return (
        <div>
            <Head>
                <title>Auth Page</title>
            </Head>
            <AuthForm
                onEmailChange={handleEmailChange}
                onPasswordChange={handlePasswordChange}
                onContinue={handleContinue}
                onSignInWithGoogle={signInWithGoogle}
                onSignInWithApple={signInWithApple}
            />
            {isProfileFormVisible && (
                <ProfileForm
                    onUsernameChange={handleUsernameChange}
                    onPlayerNameChange={handlePlayerNameChange}
                    onRegister={handleRegister}
                    password={password}
                />
            )}
        </div>
    );
};

export default AuthPage;

