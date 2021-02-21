import { Component, createContext } from "react";
import { readData } from "../firebase/storge/RealTimeDB";
import {  deleteData, updateDate, removeListner} from "../firebase/storge/RealTimeDB";
import {userContext} from "../providers/UserProvider";
import { useHistory } from "react-router-dom";

function Meeting(params) {
    /** single meeting info */
    const history = useHistory();

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

                    {" "}
                    <button onClick={(e)=>{
                        let url = `/attendees/${params.meetingKey}`;
                        history.push(url);}}
                        type="button"
                        className="btn btn-primary float-right">Attendees List</button>

                    {" "}
                    <button onClick={(e)=>{ 
                            let url = `/checkin/${params.meetingKey}`
                            history.push(url);}}

                        type="button"
                        className="btn btn-primary float-right">Add Attende</button>
                        

                
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
        let prom = readData(path, 'a', 'meetingName', 10, this.getMeetings, 'value');
        
        prom
        .then(({listener, ref})=>{
            this.meetingListListner = {
                "listener":listener,
                "ref":ref,
                "event":'value'
            };
        });
        return ;
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
        let path = "meetings/" + this.context.uid + "/" + key;
        let prom = deleteData(path);
        return ;
    }

    componentWillUnmount()
    {
        console.log("un mount attendes")
        let listener = this.meetingListListner.listener;
        let ref = this.meetingListListner.ref;
        let event = this.meetingListListner.event;
        removeListner(listener, ref, event);
        
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