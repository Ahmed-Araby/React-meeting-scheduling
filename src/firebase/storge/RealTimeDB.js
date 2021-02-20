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


export function saveData(path, data) {
    let ref = realTimeDB.ref(path); // what if the path did not exist before.
    let key = ref.push(data).key;
    console.log("new key os ", key);
    
}

export function readData(path, start,orderByKey, limit) {
    let ref = realTimeDB.ref(path)
                        .orderByChild(orderByKey)
                        .startAfter(start)
                        .limitToFirst(limit);
    ref.once('value', (snapshot)=>{
        console.log("snap shot data is ", snapshot.key, snapshot.val());
    });

    return ;
}