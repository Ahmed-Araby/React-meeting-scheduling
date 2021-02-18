import { useContext } from "react";
import { userContext } from "../providers/UserProvider";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navigation()
{
    const user = useContext(userContext);

    return (
            <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
                <div className="container-fluid">
                    
                    <Link to="/" className="navbar-brand">
                        <FaUsers/> Meeting Log
                    </Link>

                    <div className="navbar-nav ml-auto">
                    
                    {
                        !user.data && (
                        <>
                            <Link className="nav-item nav-link" to="/signin">
                                log in
                            </Link>
                            
                            <Link className="nav-item nav-link" to="/signup">
                                register
                            </Link>
                         </>
                        )
                    }

                    {//** conditional rendering */
                        user.data && 
                        <>
                            <Link className="nav-item nav-link" to="/meetings">
                                    meetings
                            </Link>
                            
                            <a className="nav-item nav-link" href="/signin"
                                onClick={user.signOut}>
                                log out
                            </a>
                        </>
                    }

                    </div>
                </div>
            </nav>
    )
}