import {fork} from "redux-saga/effects";
import {watchAddNewCard, watchGetAllCards} from './sagas/flows';

export default function* rootSaga() {
    console.log("root saga fired");
    yield fork(watchAddNewCard);
    yield fork(watchGetAllCards);
}