import {  realTimeDB } from "../firebase";


export default function StoreUserData(userData) {
    let dispName = userData['displayName'];
    let email = userData['email']
    let uid = userData['uid'];
    let ref = realTimeDB.ref(uid);
    let resp = ref.set({"email":email, 
                        "dispName":dispName}); // return promise.
}