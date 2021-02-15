import {  Component, createContext } from "react";

export const userContext = createContext(null);

export default class UserProvider extends Component{

    constructor(props){
        super(props);
        this.state = {
            "user":null
        }
    }

    render(){
        return <userContext.Provider value={this.state.user}> 
            {this.props.children}
        </userContext.Provider>
    }
}