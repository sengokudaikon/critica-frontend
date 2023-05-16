import * as React from "react";
import { useState } from "react";
import styles from "../styles/Profile.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ProfileFormProps {
    onUsernameChange: (username: string) => void;
    onPlayerNameChange: (playerName: string) => void;
    onPasswordChange: (password: string | undefined) => void;
    onRegister: (username: string, playerName: string, password: string, isAgree: boolean) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onUsernameChange, onPlayerNameChange, onPasswordChange, onRegister }) => {
    const [username, setUsername] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [password, setPassword] = useState("");
    const [isAgree, setIsAgree] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
        onUsernameChange(newUsername);
    };

    const handlePlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPlayerName = event.target.value;
        setPlayerName(newPlayerName);
        onPlayerNameChange(newPlayerName);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        onPasswordChange(newPassword);
    }

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgree(event.target.checked);
    }

    const handleRegister = () => {
        onRegister(username, playerName, password, isAgree);
    }

    return (
        <div className={styles.frame}>
            <span className={styles["greeting-text"]}>Познакомимся?</span>
            <span className={styles["greeting-text-2"]}>
        Зарегистрируйся для записи на турниры и игровые вечера
      </span>
            <div className={styles["username-container"]}>
                <TextField className={styles["username"]} label="Уникальный username" onChange={handleUsernameChange} />
            </div>
            <div className={styles["player-name-container"]}>
                <TextField className={styles["player-name"]} label="Игровой никнейм" onChange={handlePlayerNameChange} />
            </div>
            <div className={styles["flex-password-container"]}>
                <TextField className={styles["password-instance"]} label="Пароль" type="password" onChange={handlePasswordChange}/>
            </div>
            <div className={styles["checkbox-container"]}>
                <FormControlLabel
                    className={styles["checkbox-instance"]}
                    control={<Checkbox onChange={handleCheck} />}
                    label="Я согласен с правилами"
                />
            </div>
            <div className={styles["flex-container-register"]}>
                <Button className={styles["register-instance"]} onClick={handleRegister} variant="contained" color="primary">
                    Войти
                </Button>
            </div>
        </div>
    );
};

export default ProfileForm;