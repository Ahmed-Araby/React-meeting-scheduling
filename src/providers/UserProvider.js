import {  Component, createContext } from "react";
import { firebaseAuth } from "../firebase/firebase";
import { getUserData }from "../firebase/storge/RealTimeDB";
import { EmailPassSignOut } from "../firebase/auth/EmailPassAuth";

export const userContext = createContext(null);
export default class UserProvider extends Component{

    constructor(props){
        super(props);
        this.state = {
            "user":null
        }
    }
    
    componentDidMount(){
        /**
         * this function listen to sign up
         * and sign in.
         */
        firebaseAuth.onAuthStateChanged((userCred)=>{
            console.log("auth change");
            if(userCred){
                let uid = userCred.uid;
                getUserData(uid)
                .then((snapshot)=>{
                    if(snapshot.exists()){
                        let userData  = snapshot.val();
                        console.log("user data is ", userData);
                        this.setState({"user":userData});
                    }
                    else{
                        console.log("there is no data ")
                    }
                });
                
            }
        })
    }

    signOut = (e)=>
    {
        e.preventDefault();
        EmailPassSignOut()
        .then(()=>{
            console.log("sign out");
            this.setState({"user":null});

        })
    }

    render(){
        return <userContext.Provider value={{"data":this.state.user,
                                             "signOut":this.signOut}}> 
            {this.props.children}
        </userContext.Provider>
    }
}