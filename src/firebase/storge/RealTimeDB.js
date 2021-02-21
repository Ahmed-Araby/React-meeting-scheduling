/** firebase realtime data base support transactions */

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
    let key = ref.push(data).key;  // key is generated locally, using the cur time stamp.
    //console.log("new key os ", key);
    
}

export async function readData(path, start, orderByKey, limit, callback)
{
    let ref = realTimeDB.ref(path)
                        .orderByChild(orderByKey)
                        // for pagination
                        .startAfter(start)
                        .limitToFirst(limit);
                        
    ref.on('value', callback);
}


export function deleteData(path) {
    let ref = realTimeDB.ref(path);
    let prom = ref.remove();
    return prom;
}

export function updateDate(path, newDate) {
    let ref = realTimeDB.ref(path);
    // it will only update the specified keys
    ref.update(newDate);
}

export async function isNotExist(path, orderByProp, equalToProp) 
{
    let ref = realTimeDB.ref(path)
                        .orderByChild(orderByProp)
                        .equalTo(equalToProp);

    let prom = ref.once('value');
    let snapshot = await prom;

    if(snapshot.exists() == false)
        return  Promise.resolve();  // return true;
    return Promise.reject("data exist");  // return false;
}
