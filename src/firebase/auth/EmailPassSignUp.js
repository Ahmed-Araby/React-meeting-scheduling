import { useCallback } from "react";
import { userContext } from "../../providers/UserProvider";
import { firebaseAuth } from "../firebase";


export default async function EmailPassSignUp(email, pass) 
{
    console.log("email pass sign  up");
    let prom = firebaseAuth.createUserWithEmailAndPassword(email, pass);
    let userCred = await prom;
    console.log("email pass sign up succed ");
    
    // tell the clien we succeded.
    return Promise.resolve(userCred.user.uid); 
}