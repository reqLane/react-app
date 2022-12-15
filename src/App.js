import React, {useState} from "react";
import {Navigate, Route, Routes} from "react-router";
import LoginForm from "./components/LoginForm";
import DashBoard from "./components/DashBoard";

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
                <Route exact path="/dashboard" element={<DashBoard authorized={user !== ""} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
