import * as React from "react";
import styles from "../styles/Auth.module.scss";
import ellipse from "../assets/ellipse.svg";
import apple from "../assets/apple.svg";
import star from "../assets/star.svg";
import google from "../assets/google.svg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Image from "next/image";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

interface AuthFormProps {
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onContinue: () => void;
    onSignInWithGoogle: () => void;
    onSignInWithApple: () => void;
}


const AuthForm: React.FC<AuthFormProps> = ({ onEmailChange, onPasswordChange, onContinue, onSignInWithGoogle, onSignInWithApple }) => {
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onEmailChange(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onPasswordChange(event.target.value);
    };

    return (
        <Box className={styles["frame"]}>
            <Box className={styles["logo-container"]}>
                <Image src={ellipse} alt={ellipse} className={styles["ellipse"]}/>
                <Image src={star} alt={star} className={styles["star"]}/>
            </Box>
            <Typography variant="h6" className={styles["critika"]}>
                critika
            </Typography>
            <Typography variant="subtitle1" className={styles["auth-text"]}>
                Войти или зарегистрироваться
            </Typography>
            <Box className={styles["player-name-container"]}>
                <TextField
                    InputProps={{
                        style: { color: "#fff" }
                    }}
                    className={styles["username-email"]}
                    label="Email"
                    onChange={handleEmailChange}
                />
                <Typography variant="body1" className={styles["passwordText"]}>
                    Email
                </Typography>
            </Box>
            <Box className={styles["flex-password-container"]}>
                <TextField
                    InputProps={{
                        style: { color: "#fff" }
                    }}
                    className={styles["password-instance"]}
                    type="password"
                    label="Password"
                    onChange={handlePasswordChange}
                />
                <Typography variant="body1" className={styles["passwordText"]} >
                    Password
                </Typography>
            </Box>
            <Button className={styles["continue-instance"]} variant="contained" color="error" size="large" onClick={onContinue}>Продолжить</Button>
            <Button className={styles["google-instance"]} variant="contained" color="primary" size="large" disableElevation fullWidth startIcon={<Image src={google} alt={google}/>} onClick={onSignInWithGoogle}>Авторизация Google</Button>
            <Button className={styles["apple-instance"]} variant="outlined" size="large" disableElevation color="error" startIcon={<Image src={apple} alt={google}/>} onClick={onSignInWithApple}>Авторизация Apple</Button>
        </Box>
    );
};
export default AuthForm;
