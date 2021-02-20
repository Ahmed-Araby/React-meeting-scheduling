import { Component } from "react";
import MeetingForm from "./MeetingForm";
import MeetingList from "./MeetingList";

function getTimeStamp() {
    return Date.now();
    
}

export default class Meetings extends Component
{
    constructor(props){
        super(props);        
    }

    render(){
        return (<>
            <MeetingForm/>
            <MeetingList />
        </>);
    }
}