import { useContext } from "react";
import {Context as TrackContext} from '../context/TrackContext'
import {Context as LocationContext} from '../context/LocationContext'

export default ()=>{
    const {createTrack} = useContext(TrackContext)
    const {state:{locations,name},resetLocations}= useContext(LocationContext)
    const saveTrack = async()=>{
        await createTrack(name,locations)
        console.log("RESTLOCS")
        resetLocations()
    }
    return [saveTrack]
}