import { firebaseAuth } from "../firebase";


export  async function EmailPassSignIn(email, pass)
{
    console.log("email pass sign In");
    let prom = firebaseAuth.signInWithEmailAndPassword(email, pass);
    let userCred = await prom;
    console.log("email pass sign in succeed ");
    
    // tell the clien we succeded.
    return Promise.resolve(userCred.user.uid); 
}


export async function EmailPassSignUp(email, pass) 
{
    console.log("email pass sign  up");
    let prom = firebaseAuth.createUserWithEmailAndPassword(email, pass);
    let userCred = await prom;
    console.log("email pass sign up succed ");
    
    // tell the clien we succeded.
    return Promise.resolve(userCred.user.uid); 
}

export async function EmailPassSignOut() {
    
    firebaseAuth.signOut().then(() => {
        console.log("signout successfuly");
    }).catch((error) => {
        console.log("issue in sign out ");
    });
    
}