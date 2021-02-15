import { useContext } from "react";
import { userContext } from "../providers/UserProvider";

export default function Navigation()
{
    const user = useContext(userContext);
    alert(user);

    return (
            <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
                <div className="container-fluid">
                    
                    <a href="/" className="navbar-brand">
                        Meeting Log
                    </a>

                    <div className="navbar-nav ml-auto">
                    
                    {
                        !user && (
                        <>
                            <a className="nav-item nav-link" href="/login">
                                log in
                            </a>
                            
                            <a className="nav-item nav-link" href="/register">
                                register
                            </a>
                         </>
                        )
                    }

                    {//** conditional rendering */
                        user && 
                        <>
                            <a className="nav-item nav-link" href="/meetings">
                                    meetings
                            </a>
                            
                            <a className="nav-item nav-link" href="/login">
                                log out
                            </a>
                        </>
                    }

                    </div>
                </div>
            </nav>
    )
}