import createDataContext from "./createDataContext";
import tracker from "../api/tracker";
const trackReducer = (state,action) =>{
    switch(action.type){
        case 'fetch_tracks':
            console.log('reducerfetchtracks='+action.payload.length)
            return action.payload
        default:
            return state
    }
}

const fetchTracks = (dispatch) =>{
    return async()=>{
        const response = await tracker.get('/tracks')
       //console.log(response)
        dispatch({type:'fetch_tracks',payload:response.data})
    }

}
const createTrack = (dispatch) =>{
    return async (name,locations)=>{
        try{
            console.log('createTtrack'+name,locations.length)
            const response = await tracker.post('/tracks',{name,locations})
        }catch(err){
            console.log('someerroroccured..')
        }
        
    }

}
export const {Context,Provider} = createDataContext(trackReducer,{fetchTracks,createTrack},[])