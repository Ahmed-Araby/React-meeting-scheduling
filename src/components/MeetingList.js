import { Component, createContext } from "react";
import { readData } from "../firebase/storge/RealTimeDB";
import {  deleteData, updateDate } from "../firebase/storge/RealTimeDB";
import {userContext} from "../providers/UserProvider";

function Meeting(params) {
    return (
        <>
            <li className="list-group-item">

                <span> meeting : {params.meetingName}.</span>   {" "}
                <span>crated at : {(new Date(params.createAt)).toUTCString()}</span>

                <div className="bg-light clearfix">
                    <button onClick={(e)=>{
                        params.deleteMeeting(e, params.meetingKey);
                        }}
                        type="button"
                        className="btn btn-danger float-right">Delete</button>
                </div>
            </li>
        </>
    )
}

export default class MeetingList extends Component
{
    static contextType = userContext;

    constructor(props)
    {
        super(props);
        this.state = {"meetings":[]};
        this.limit = 20;

    }
    
    componentDidMount() {
        /**what if I used "this" here !!!??? */
        let path = "meetings/" + this.context.uid;
        readData(path, 'a', 'meetingName', 10, this.getMeetings);
        //updateDate("meetings/1",  {"meetingName":"play football2"});
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
        let path = "meetings/" + this.context.uid;
        let prom = deleteData(path+key);
        return ;
    }

    render()
    {
        return (
            <ul className="list-group meeting_list">
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
        )
    }
}