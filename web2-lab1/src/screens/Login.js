import React from "react";
import LoginButton from "../components/LoginButton"
import Profile from "../components/Profile"
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {
    const { isLoading, error } = useAuth0();

    return (
        <div className="container">
            {error && <p>Authentication error</p>}
            {error && isLoading && <p>Loading...</p>}
            {!error && !isLoading && (
                <>
                    <main className="main">
                        <div>
                            <LoginButton />
                            <Profile />
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};
export default Login;