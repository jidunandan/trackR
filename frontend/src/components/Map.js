import React, { useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Polyline, Circle } from 'react-native-maps'
import { Context as LocationContext } from '../context/LocationContext'

const Map = () => {
    const { state: { currentLocation, locations } } = useContext(LocationContext)
   
    if (!currentLocation) {
        return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
    }

    return (
        <View>
            <MapView style={styles.map}
                initialRegion={{
                    ...currentLocation.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
               
            >
                <Circle
                    center={currentLocation.coords}
                    radius={30}
                    fillColor='green'
                />
                <Polyline coordinates={locations.map(item => item.coords)} />
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    map: {
        height: 300
    }
})
export default Map;