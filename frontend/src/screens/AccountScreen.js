import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import { SafeAreaView } from 'react-navigation'
import { Feather } from '@expo/vector-icons'

const AccountScreen = () => {
    const { signOut } = useContext(AuthContext)
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1}}>
                <Spacer>
                    <Text h3>Account Screen</Text>
                </Spacer>
                
                    <View style={styles.signOut}>
                        <Button title="Sign Out"  onPress={signOut} />
                    </View>

                
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    signOut: {
       position:'absolute',
       bottom:10,
       alignSelf:'center'

    }
})
AccountScreen.navigationOptions = ({ navigation }) => {
    return {
        tabBarIcon: ({ focused, tintColor }) => {
            const iconName = `user${focused ? 's' : ''}`;
            return <Feather name={iconName} size={20} />;
        },
    }
}
export default AccountScreen;