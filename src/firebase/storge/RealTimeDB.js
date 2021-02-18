import {  realTimeDB } from "../firebase";


export function StoreUserData(userData) {
    let dispName = userData['displayName'];
    let email = userData['email']
    let uid = userData['uid'];
    let ref = realTimeDB.ref(uid);
    let resp = ref.set({"email":email, 
                        "dispName":dispName}); // return promise.
}

export async function getUserData(key) {
    let snapshot = await realTimeDB.ref(key).get();
    return Promise.resolve(snapshot);
}