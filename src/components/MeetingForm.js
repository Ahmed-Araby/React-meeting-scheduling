import { Component } from "react";
import { saveData } from "../firebase/storge/RealTimeDB";
import {userContext} from "../providers/UserProvider";

function getTimeStamp() {
    return Date.now();
    
}
export default class MeetingForm extends Component
{
    static contextType = userContext;

    constructor(props)
    {
        super(props);
        this.state = {"meetingName":""}

        // binding
        this.handleChange = this.handleChange.bind(this);
        this.addMeeting = this.addMeeting.bind(this);
    }

    handleChange(e)
    {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value});
        return ;
    }

    addMeeting(e)
    {
        e.preventDefault();
        let data = {"meetingName":this.state.meetingName, "createAt":getTimeStamp()};
        // save the meeting.
        let path = "meetings/" + this.context.uid;
        saveData(path, data);
    }

    render(){
        return (
        <div className="container mt-4">
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Meeting</h1>
            <div className="card bg-light">
                <div className="card-body text-center">
                <form className="formgroup" onSubmit={this.addMeeting}>
                    <div className="input-group input-group-lg">
                    <input
                        type="text"
                        className="form-control"
                        name="meetingName"
                        placeholder="Meeting name"
                        aria-describedby="buttonAdd"
                        value = {this.state.meetingName}
                        onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                        <button
                        type="submit"
                        className="btn btn-sm btn-info"
                        id="buttonAdd"
                        >
                        +
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }
}