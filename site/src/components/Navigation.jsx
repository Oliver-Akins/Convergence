import { Link } from "react-router-dom";

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
    return(
        <nav className="navigation navigation--dashboard">
            <div className="container">
                <p className="navigation__home" to="#"><img alt="" src={require("../images/logo-small.svg").default}></img>Convergence</p>
            </div>
        </nav>
    );
}


export { Navigation, SimpleNavigation, DashboardNavigation };