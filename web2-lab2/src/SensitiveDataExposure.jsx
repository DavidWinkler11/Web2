import { useState } from 'react';
import DOMPurify from 'dompurify';
import bcrypt from 'bcryptjs';
import './styles.css';

const salt = bcrypt.genSaltSync(10);

const SensitiveDataExposure = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [outputUsers, setOutputUsers] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [users, setUsers] = useState([]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleUsernameChange = (event) => {
        setInputUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setInputPassword(event.target.value);
    };

    const handleAddClick = () => {
        if (!isChecked) {
            const usernameExists = users.some((user) => user.username === inputUsername);

            if (usernameExists) {
                alert("Username already exists.");
            } else {
                const hashedPassword = bcrypt.hashSync(inputPassword, salt);
                setUsers([...users, { username: inputUsername, password: hashedPassword }]);
            }
        } else {
            const usernameExists = users.some((user) => user.username === inputUsername);

            if (usernameExists) {
                alert("Username already exists.");
            } else {
                setUsers([...users, { username: inputUsername, password: inputPassword }]);
            }
        }
        setOutputUsers("");
        setInputUsername("");
        setInputPassword("");
    };

    const handleShowUsersClick = () => {
        const userList = users.map((user, index) => (
            <div key={index}>
                <p>Username: {DOMPurify.sanitize(user.username)}</p>
                <p>Password: {DOMPurify.sanitize(user.password)}</p>
                <hr />
            </div>
        ));
        setOutputUsers(userList);
    };

    return (
        <div className="container">
            <h1>Sensitive Data Exposure Demo</h1>
            <div className="input-container">
                <div className="label-input">
                    <label>
                        Username:
                        <input type="text" value={inputUsername} onChange={handleUsernameChange} placeholder="Username" />
                    </label>
                </div>
                <div className="label-input">
                    <label>
                        Password:
                        <input type="password" value={inputPassword} onChange={handlePasswordChange} placeholder="Password" />
                    </label>
                </div>
            </div>
            <button onClick={handleAddClick}>Add User</button>
            <button onClick={handleShowUsersClick}>Show Users</button>
            <div className="checkbox-container">
                <label>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    Enable Sensitive Data Exposure
                </label>
            </div>
            <h2>List of Users:</h2>
            <div>{outputUsers}</div>
        </div>
    );
};

export default SensitiveDataExposure;
