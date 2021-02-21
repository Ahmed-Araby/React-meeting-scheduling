import {  useContext,Component } from "react";
import {  userContext } from "../providers/UserProvider";
import {  readData, deleteData } from "../firebase/storge/RealTimeDB";

function OneAttende(params) 
{
    const user = useContext(userContext);

    return (
        <li className="list-group-item">
          
          Name: {params.name}
          <br/>
          Email: {params.email}
          <br/>
          <button type="button"
                  className="btn btn-danger"
                  onClick={
                      (e)=>{
                        let path = "meetings/" + user.uid + "/" +  params.meetingId + "/attendees/" + params.attendeKey;
                        console.log("delete attende path ", path);
                        
                        deleteData(path);
                      }
                  }
                  >
          Delete</button>

        </li>
    )
}

export default class Attendees extends Component
{
    static contextType = userContext

    constructor(props)
    {
        super(props);
        this.meetindId = this.props.match.params.meetingId;
        this.state = {
            "attendees":[]
        }
    }

    populateAttendes = (snapshot)=>
    {        
        /** think of snapshot as a node of nodes, so each node have val and key and ref till
         * would val be node also or dict !!!???
         */

        let attendees = [];
        snapshot.forEach((child)=>{
            attendees.push({...child.val(), "key":child.key});
        });
        this.setState({"attendees":attendees});    
    }

    componentDidMount()
    {
        let path = "meetings/" + this.context.uid + "/" +  this.meetindId + "/attendees";
        console.log("path is ", path);
        readData(path, 'a', 'email', 10, this.populateAttendes);
    }

    render()
    {
        console.log(this.state.attendees);
        return (
            <ul className="list-group attendees_list">
                {
                    this.state.attendees.map((attendeData)=>{
                        return (
                            <OneAttende key={attendeData.key}
                                        name={attendeData.name}
                                        email={attendeData.email}
                                        attendeKey={attendeData.key}
                                        meetingId = {this.meetindId}
                                        />
                        )
                    })    
                }
            </ul>
        )
    }
}