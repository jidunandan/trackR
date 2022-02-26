import React, { useCallback, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import Spacer from '../components/Spacer'
import Map from '../components/Map'
import '../_mockLocation'
import { AntDesign } from '@expo/vector-icons'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
const TrackcreateScreen = ({ isFocused }) => {
    const { state, pushLocations } = useContext(LocationContext)
    const callback = useCallback(location=> {
        pushLocations(location,state.recording)
    },[state.recording])
    const [err] = useLocation(isFocused || state.recording,callback)
    return (
        <View>
            <SafeAreaView forceInset={{ top: 'always' }}>
                <Spacer>
                    <Text h2>Create a Track</Text>

                    <Map />
                    {err ? <Text>Some Loc Error Occured</Text> : null}

                </Spacer>
                <Spacer>
                    <TrackForm />
                </Spacer>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({

})

TrackcreateScreen.navigationOptions = ({ navigation }) => {
    return {
        tabBarIcon: ({ focused, tintColor }) => {
            const iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return <AntDesign name='plus' size={20} />;
        },
    }
}
export default withNavigationFocus(TrackcreateScreen);