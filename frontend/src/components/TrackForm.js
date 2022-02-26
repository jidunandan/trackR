import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Context as LocationContext } from '../context/LocationContext'
import Spacer from './Spacer'
import useSaveTrack from '../hooks/useSaveTrack'
const TrackForm = () => {
    const { state: { name, recording, locations }, startRecording, stopRecording, changeName,resetLocations } = useContext(LocationContext)
     //console.log(locations.length)
     const [onSaveTrack] = useSaveTrack()
    //console.log(recording)
    return (
        <View>
            <Input label='Track Name:' onChangeText={changeName} value={name} />
            <Spacer>
                {recording ? <Button onPress={stopRecording} title="Stop Recording" /> :
                    <Button onPress={startRecording} title="Start Recording" />}
                </Spacer>
                <Spacer>
                {!recording && locations.length > 0 ? <Button onPress={onSaveTrack} title="Save Recording" /> : null}
            </Spacer>
            <Spacer>
                 <Button onPress={resetLocations} title="Reset Locations" />
            </Spacer>
        </View>
    )
}
export default TrackForm;