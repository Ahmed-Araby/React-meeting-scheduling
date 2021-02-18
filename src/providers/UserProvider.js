import {  Component, createContext } from "react";
import { firebaseAuth } from "../firebase/firebase";
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
            let uid = userCred.uid;
            // read data from the data base
        })
    }
    render(){
        return <userContext.Provider value={this.state.user}> 
            {this.props.children}
        </userContext.Provider>
    }
}