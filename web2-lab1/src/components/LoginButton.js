import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div>
                <h1 className="heading">Welcome!</h1>
                <h2>Log in using auth0:</h2>
                <button onClick={() => loginWithRedirect()} className="button">
                    Sign In
                </button>
            </div>
        )

    )
}
export default LoginButton;