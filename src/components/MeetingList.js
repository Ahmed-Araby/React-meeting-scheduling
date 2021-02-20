import { Component, createContext } from "react";
import { readData } from "../firebase/storge/RealTimeDB";
import {  deleteData, updateDate } from "../firebase/storge/RealTimeDB";

function Meeting(params) {
    return (
        <>
            <span> meeting : {params.meetingName}.</span>   {" "}
            <span>crated at : {(new Date(params.createAt)).toUTCString()}</span>
            <button onClick={(e)=>{
                params.deleteMeeting(e, params.meetingKey);
            }} >delete</button>
            <br></br>
        </>
    )
}

export default class MeetingList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {"meetings":[]};
        this.limit = 20;

    }
    
    componentDidMount() {
        /**what if I used "this" here !!!??? */
        readData('meetings', 'a', 'meetingName', 10, this.getMeetings);
        updateDate("meetings/1",  {"meetingName":"play football2"});
    }

    getMeetings = (snapshot)=>{
        let meetings = [];
        snapshot.forEach((child)=>{
            console.log(child);
            meetings.push({"key":child.key, "meeting":child.val()});
        });
        this.setState({"meetings":meetings});
    }

    deleteMeeting = (e, key) => {
        let prom = deleteData("meetings/"+key);
        return ;
    }

    render()
    {
        return (
            <ul>
                {
                    this.state.meetings.map(({key, meeting})=>{
                         
                        return (<Meeting key={key}
                                        meetingKey={key}
                                        meetingName={meeting.meetingName}
                                        createAt={meeting.createAt}
                                        deleteMeeting={this.deleteMeeting}>
                                </Meeting>
                        );
                    })
                }
            </ul>
        );
    }
}