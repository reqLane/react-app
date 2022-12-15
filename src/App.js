import React, {useState} from "react";
import {Navigate, Route, Routes} from "react-router";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
    const [user, setUser] = useState("");
    const [error, setError] = useState("");

    const Login = details => {
        let loginRegExp = new RegExp(/[a-zA-Z]+[1-9]/);
        if(loginRegExp.test(details.login)) {
            setUser(details.login);
            setError("");
        }
        else {
            setError("Login is invalid!");
        }
    }

    return (
        <div className="App">
            <Routes>
                <Route exact path="/login" element={<LoginForm Login={Login} error={error} authorized={user !== ""} />} />
                <Route exact path="/dashboard" element={<Dashboard authorized={user !== ""} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
