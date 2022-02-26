import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'add_current_loc':
            //console.log("ADDING LOC")
            return { ...state, currentLocation: action.payload }
        case 'start_recording':
            return { ...state, recording: true, locations: [] }
        case 'stop_recording':
            return { ...state, recording: false }
        case 'push_locations':
            return { ...state, locations: [...state.locations, state.currentLocation] }
        // return { ...state, locations: [...state.locations, action.payload] }
        case 'change_name':
            return { ...state, name: action.payload }
        case 'reset_locations':
            return { ...state, locations: [],name:'' }
        default:
            return state
    }
}
const changeName = (dispatch) => (name) => {
    dispatch({ type: 'change_name', payload: name })
}
const startRecording = (dispatch) => () => {
    dispatch({ type: 'start_recording' })
}
const stopRecording = (dispatch) => () => {
    dispatch({ type: 'stop_recording' })
}
const pushLocations = (dispatch) => (location, isRecording) => {
    dispatch({ type: 'add_current_loc', payload: location })
    //console.log('pushloc'+isRecording)
    if (isRecording)
        dispatch({ type: 'push_locations', payload: location })
}
const resetLocations = (dispatch) => () => {
    dispatch({ type: 'reset_locations' })
}
export const { Context, Provider } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, pushLocations, changeName, resetLocations },
    { recording: false, locations: [], currentLocation: null }
)
