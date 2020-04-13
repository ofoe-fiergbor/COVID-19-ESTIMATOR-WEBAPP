const initialState = []

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case 'ESTIMATE_IMPACT':
            return action.payload
        default:
            return state
    }
}
export default reducer