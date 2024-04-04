import {put, call, takeEvery, take} from "redux-saga/effects";
import {
    GET_CARDS,
    GET_CARDS_SUCCESS,
    ADD_CARD,
    ADD_CARD_SUCCESS,
} from '../actions/actions';
import {channel } from 'redux-saga';
import {firestore} from '../config/firebase.js';
import { collection, onSnapshot, setDoc, doc, addDoc } from 'firebase/firestore';
function* callGetAllCardsSagas(action) {
    console.log(action,"call firebase 1 ");
    const ref = collection(firestore, "data");
    const snapshotChannel = yield call(channel);
    const unsubscribe = onSnapshot(ref, snapshot => {
        snapshotChannel.put(snapshot);
    });
    try {
        while (true) {
            const snapshot = yield take(snapshotChannel);
            const data = snapshot.docs.map(doc => doc.data());
            yield put({type: GET_CARDS_SUCCESS, data: data});
        }
    } finally {
        unsubscribe();
    }
}
export function* watchGetAllCards() {
    console.log('watcher fired');
    yield takeEvery(GET_CARDS, callGetAllCardsSagas);
}
async function addNewCardAsync(data) {
   
    let id = data.user;
    console.log(data, "addNewCardAsync");
    let colRef = collection(firestore, "data");
    //const myDocRef = doc(colRef, id);
    const mydata = {...data, timestamp: Date.now()};
    await addDoc(colRef, mydata);
    return id
}


function* callAddNewCardSagas(action) {
    try {
        yield call(addNewCardAsync, action.data);
        yield put({type: ADD_CARD_SUCCESS});
        

    } catch (error) {
        console.log(error);
        
    }
}
export function* watchAddNewCard() {
    yield takeEvery(ADD_CARD, callAddNewCardSagas);
}