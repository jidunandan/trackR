import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import { NavigationEvents } from 'react-navigation'
import { Context as TrackContext } from '../context/TrackContext'
const TrackdetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext)
    const track = state.find(item => item._id === navigation.getParam('id'))
    return (
        <View>
            <Text>{track.name}</Text>
            <MapView style={{height:300}}
                initialRegion={
                    {
                        ...track.locations[0].coords,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }
                }>
                <Polyline coordinates={track.locations.map((item)=>item.coords)}/>
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({

})
export default TrackdetailScreen;