import {  Component, useContext} from "react";
 import {  userContext } from "../providers/UserProvider";

export default function Home(){

    const user = useContext(userContext);    
    
    
    return (    
        <div className="container text-center">
        <div className="row justify-content-center">
            <div className="col-10 col-md-10 col-lg-8 col-xl-7"
             style={{fontSize: 3 +'em'}}>
                Meeting Log
            <div className="display-4 text-primary mt-3 mb-2">
            </div>
            <p className="lead">
                This simple app creates meetings, allows people to check
                in, and picks random users to award giveaways. It's a
                good example of a Single Page Application which includes
                connection to a database and routing. It's a practical
                way to learn <a href="https://reactjs.org/">React</a> 
                {' '}with <a href="https://firebase.google.com">Firebase</a>.
            </p>
        
            {
                !user && 
                <>
                    <a href="/register" className="btn btn-outline-primary mr-2">
                        Register
                    </a>
                    <a href="/login" className="btn btn-outline-primary mr-2">
                        Log In
                    </a>
                </>
            }
            {
                user && 
                <a href="/meetings" className="btn btn-primary">
                Meetings
                </a>
            }

            </div> 
        </div>
        </div>
    )
}