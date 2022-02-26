import React, { useState,useContext } from 'react'
import { View, StyleSheet, ImageBackground ,TouchableOpacity} from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import {NavigationEvents} from 'react-navigation'
const image = { uri: "https://reactjs.org/logo-og.png" };

const SigninScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {state,signIn,clearError} = useContext(AuthContext)
    const {errorMessage} = state;
   
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={clearError} />
            <ImageBackground source={require('../../assets/background.jpg')} resizeMode="cover" style={styles.image}>
            {/* <Spacer>
                <Text h1 >trackR</Text>
            </Spacer> */}
            <Spacer>
                <Text h3>SignIn to trackR</Text>
            </Spacer>
            <Input label="email"
                value={email}
                onChangeText={(newVal) => { setEmail(newVal) }}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Spacer />
            <Input label="password"
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false} />
            <Spacer>
              {errorMessage?  <Text>{errorMessage}</Text>:null}
                <Button title="Sign In" onPress={()=>{
                    console.log("button clicked")
                    signIn({email,password})}} />
            </Spacer>
            <Spacer>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                <Text style={styles.link}>Dont have an account ? Sign Up</Text>
            </TouchableOpacity>
            </Spacer>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    link:{
        color:'blue'
    }
})
SigninScreen.navigationOptions = { header: false }
export default SigninScreen;