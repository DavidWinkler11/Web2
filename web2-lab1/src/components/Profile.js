import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import YourCompetitions from "./YourCompetitions";
import AccountButton from "./accountButton";


const Profile = () => {
    const { user, logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div>
                <article className="column">
                    {user?.picture && <img src={user.picture} alt="" />}
                    <h2>{user?.name}</h2>
                </article>
                <YourCompetitions />
                <Link to="/competitionCreator">
                    <button className="button">Create Competition</button>
                </Link>
                <AccountButton />
                <button onClick={() => logout()} className="button">
                    Sign Out
                </button>
            </div>
        )

    )
}
export default Profile;