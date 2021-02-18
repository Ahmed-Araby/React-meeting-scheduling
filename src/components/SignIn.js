import { useState } from "react";
import { userContext } from "../providers/UserProvider";
import {EmailPassSignIn} from "../firebase/auth/EmailPassAuth";
import StoreUserData from "../firebase/RealTimeDB/StoreUserData";

export default function SignIn(params) 
{
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function onInputChangee(e)
    {
        let name = e.target.name;
        let value = e.target.value;
        
        if(name == "email")
            setEmail(value);
        else
            setPass(value);
    }

    function submitForm(e)
    {
        e.preventDefault();
        EmailPassSignIn(email, pass);
        return ;
    }

    return (
        <form className="mt-3"  onSubmit={submitForm}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>
                  <div className="form-row">
                  </div>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      value={email}
                      onChange={onInputChangee}
                    />
                  </section>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="pass"
                        placeholder="Password"
                        value={pass}
                        onChange={onInputChangee}
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      signIn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
}