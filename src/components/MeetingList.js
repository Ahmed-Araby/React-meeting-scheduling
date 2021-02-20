import { Component } from "react";
import { readData } from "../firebase/storge/RealTimeDB";
function getTimeStamp() {
    return Date.now();
    
}
export default class MeetingList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {"meetings":[]};
        this.limit = 20;

    }

    componentWillMount()
    {
        /**what if I used "this" here !!!??? */
        console.log("meeting list here ");
        readData('meetings', 'a', 'meetingName', 10);
    }

    render()
    {
        return (
            <ul>
                {
                    this.state.meetings.map((meeting)=>{
                        return <li key={meeting.createAt}> 
                        {meeting.meetingName} --- {meeting.createAt}</li>
                    })
                }
            </ul>
        );
    }
}