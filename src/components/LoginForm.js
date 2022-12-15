import React, { useState } from "react";
import {Navigate} from "react-router";

function LoginForm({Login, error, authorized}) {
    if(authorized) return (<Navigate to="/dashboard" />);

    const [details, setDetails] = useState({login: "", password: ""});

    const submitFunc = e => {
        e.preventDefault();

        Login(details);
    }

    return (
        <form onSubmit={submitFunc}>
            <div className="form-inside">
                <h2>Login</h2>
                <div className="form-section">
                    <label htmlFor="login">Login:</label>
                    <input type="text" name="login" id="login" onChange={e => setDetails({...details, login: e.target.value})} required={true}/>
                </div>
                <div className="form-section">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} required={true}/>
                </div>
                <input type="submit" value="LOGIN"/>
                {(error !== "") ? (
                    <div className="error">{error}</div>
                ) : ""}
            </div>
        </form>
    );
}

export default LoginForm;