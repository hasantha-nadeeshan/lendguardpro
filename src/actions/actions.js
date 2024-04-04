export const ADD_CARD ='ADD_CARD';
export const ADD_CARD_SUCCESS ='ADD_CARD_SUCCESS';

export const GET_CARDS ='GET_CARDS';
export const GET_CARDS_SUCCESS ='GET_CARDS_SUCCESS';

export function getAllCards(data) {
    console.log("action fired");
    return {type: GET_CARDS,data}
}
export function addNewCard(data) {
    console.log("action fired add new data");
    return {type: ADD_CARD, data}
}
