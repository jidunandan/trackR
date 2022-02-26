import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { Context as TrackContext } from '../context/TrackContext'
import {FontAwesome} from '@expo/vector-icons'
const TracklistScreen = ({ navigation }) => {
    const { fetchTracks, state } = useContext(TrackContext)
    console.log(state.length + "-----#####")
    return (
        <View>
            <NavigationEvents onWillFocus={fetchTracks} />

            <Text>TracklistScreen</Text>
            <FlatList
                data={state}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate('TrackDetails',{id:item._id})}}
                        >
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity>
                    )
                }} />
            {/* <Button title="See Track Details"
                onPress={() => { navigation.navigate('TrackDetails') }} /> */}
        </View>
    )
}
const styles = StyleSheet.create({

})
TracklistScreen.navigationOptions = ({ navigation }) => {
    return {
        title:'Track Lists',
        tabBarIcon: ({ focused, tintColor }) => {
            const iconName = `ios-information-circle${focused ? '' : '-outline'}`;
            return <FontAwesome name='list-ul' size={20} />;
        },
    }
}
export default TracklistScreen;