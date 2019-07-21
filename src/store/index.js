import * as Redux from 'redux'
import reducer from "./reducer/index.js"

const initialState = {
    client: [],
    site: [],
    relance: []
}
const store = Redux.createStore(
    reducer,
    initialState
);

export default store