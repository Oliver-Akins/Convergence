import { Link, useNavigate } from "react-router-dom";

import { Button } from "./Button";

import { logout } from "./api/authentication";

function Navigation() {
    return(
        <nav className="navigation">
            <div className="container--navigation container">
                <Link className="navigation__home" to="/"><img alt="" src={require("../images/logo-small.svg").default}></img>Convergence</Link>
                <Link className="navigation__login" to="/login">Login</Link>
                <Link className="btn btn--unfilled" to="/register">Sign Up</Link>
            </div>
        </nav>
    );
}

function SimpleNavigation() {
    return(
        <nav className="navigation">
            <div className="container--navigation container">
                <Link className="navigation__home" to="/"><img alt="" src={require("../images/logo-small.svg").default}></img>Convergence</Link>
            </div>
        </nav>
    );
}

function DashboardNavigation() {
    let navigate = useNavigate();

    const handleLogout = (e) => {
        logout();
        navigate("/");
    }

    return(
        <nav className="navigation navigation--dashboard">
            <p className="navigation__home" to="#"><img alt="" src={require("../images/logo-small.svg").default}></img>Convergence</p>
            <Button text="Logout" classes="btn--unfilled" onClickCallback={handleLogout}></Button>
        </nav>
    );
}


export { Navigation, SimpleNavigation, DashboardNavigation };