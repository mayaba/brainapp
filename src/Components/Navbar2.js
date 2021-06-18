import './Styles/Navbar.css'

function Navbar2({buttonText, onSigninSubmit, onRegSubmit}) {

    return (
        <div className="columns">
            <figure className="image is-128x128 pr-1">
                <img className="is-rounded m-2" src="https://i.pinimg.com/originals/fe/43/97/fe439715360ac6fae3a00d151a9f39ef.png" alt="icon" />
            </figure>

            <nav className="navbar column is-transparent" role="navigation" aria-label="main navigation">
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <a href='#' className="navbar-item has-text-white">
                            Home
                        </a>
                        <a href='#' className="navbar-item has-text-white">
                            Documentation
                        </a>
                        <a href='#' className="navbar-item has-text-white">
                            About
                        </a>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a href='#' className="button is-primary" onClick={onRegSubmit}>
                                    <strong>Sign up</strong>
                                </a>
                                <a href='#' className="button is-light" onClick={onSigninSubmit}>
                                    {buttonText}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );

}

export default Navbar2;