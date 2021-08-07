import axios from 'axios';

export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';


const reposReducer = (state = {products: []}, action) => {
    

    switch (action.type) {
        case PRODUCT_LIST_SUCCESS :            
            return {
                products: action.payload
            }
        case PRODUCT_LIST_FAIL :
            return {
                error: action.payload
            }
        default:
            return state
    }
}


export const setCount =  (id,limit) => async (dispatch) => {
    const {data} = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&page=1&category_ids=${id}`)
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
}
export {reposReducer}