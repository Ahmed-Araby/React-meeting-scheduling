import {  Component, createContext } from "react";
import { firebaseAuth } from "../firebase/firebase";
import { getUserData }from "../firebase/storge/RealTimeDB";

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
            console.log("auth changes");
            if(userCred){
                let uid = userCred.uid;
                getUserData(uid) // from the real time data base.
                .then((snapshot)=>{
                    if(snapshot.exists()){
                        let userData  = snapshot.val();
                        this.setState({"user":{...userData, "uid":uid}});
                    }
                    else{
                        console.log("there is no data ")
                    }
                });
            }
            else
                this.setState({"user":null});
        })
    }

    render(){
        return <userContext.Provider value={this.state.user}> 
            {this.props.children}
        </userContext.Provider>
    }
}