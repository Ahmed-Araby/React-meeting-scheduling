/**
 * this component have to recieve reference to the meeting and the user that
 * own the meeting
 * 
 * the purpose of this component is to add reference to the people that
 * will attend this meeting
 * ref = {name, email}
 */

import {  useRouteMatch } from "react-router-dom";
import {  useState , useContext} from "react";
import {  userContext } from "../providers/UserProvider";
import { saveData } from "../firebase/storge/RealTimeDB";
import {  isNotExist } from "../firebase/storge/RealTimeDB";
import Attendees from "./Attendees";

export default function CheckIn(props)
{
    let match = useRouteMatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const user = useContext(userContext);

    function handleChange(e)
    {
        let name = e.target.name;
        let value = e.target.value;
        
        console.log("checkin handle value ", name, value);
        if(name == 'name')
            setName(value);
        else
            setEmail(value);    
    }

    function handleSubmit(e) {
        e.preventDefault();
        let data = {"name":name, "email":email};
        let path = "meetings/" + user.uid + "/" + match.params.meetingId + "/attendees/";
        console.log(path);
        
        let notExist = isNotExist(path, "email", email);
        notExist
        .then(()=>{
            // data dont exist
            // insertion depends on the data being not exist before.
            console.log("successful insertion ");
            saveData(path, data);
            setName("");
            setEmail("");
        })
        .catch((err)=>{
            // data exist
            console.log(err);
        })
    }

    return (
    <>
        <form className="mt-3" onSubmit={handleSubmit}>
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card bg-light">
                    <div className="card-body">
                        <h3 className="font-weight-light mb-3">Check in</h3>
                        <section className="form-group">
                        <label
                            className="form-control-label sr-only"
                            htmlFor="displayName"
                        >
                            Name
                        </label>
                        <input
                            required
                            className="form-control"
                            type="text"
                            id="displayName"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={handleChange}
                        />
                        
                        </section>
                        <section className="form-group">
                        <label
                            className="form-control-label sr-only"
                            htmlFor="Email"
                        >
                            Email
                        </label>

                        <input
                            required
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />

                        </section>
                        <div className="form-group text-right mb-0">
                        <button className="btn btn-primary" type="submit">
                            Check in
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </form>
        <Attendees match={props.match}/>

    </>

    )
}