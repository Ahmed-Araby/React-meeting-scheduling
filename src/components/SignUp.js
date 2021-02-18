import { useState } from "react";
import { userContext } from "../providers/UserProvider";
import EmailPassSignUp from "../firebase/auth/EmailPassSignUp";
import StoreUserData from "../firebase/RealTimeDB/StoreUserData";
export default function SignUp(params) 
{
    const [dispName, setDispName] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    function onInputChangee(e)
    {
        let name = e.target.name;
        let value = e.target.value;
        
        if(name =='displayName')
            setDispName(value);
        else if(name == "email")
            setEmail(value);
        else if(name =="passOne")
            setPass1(value);
        else 
            setPass2(value);
    }

    function submitForm(e)
    {
        e.preventDefault();

        // form data validation.
        if(pass1 != pass2){
            alert("password don't match")
            return ;
        }
        EmailPassSignUp(email, pass1)
        .then((uid)=>{
            StoreUserData({"displayName":dispName,
                            "email":email,
                          "uid":uid});
        })
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
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="displayName"
                      >
                            Display Name
                          </label>
                      <input
                        className="form-control"
                        type="text"
                        id="displayName"
                        placeholder="Display Name"
                        name="displayName"
                        required
                        value={dispName}
                        onChange={onInputChangee}
                      />
                    </section>
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
                        name="passOne"
                        placeholder="Password"
                        value={pass1}
                        onChange={onInputChangee}
                      />
                    </section>
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        required
                        name="passTwo"
                        placeholder="Repeat Password"
                        value={pass2}
                        onChange={onInputChangee}
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Register
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