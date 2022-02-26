import React, { useState,useContext,useEffect } from 'react'
import { View, StyleSheet, ImageBackground ,TouchableOpacity} from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
const image = { uri: "https://reactjs.org/logo-og.png" };
import {NavigationEvents} from 'react-navigation'
const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {state,signUp,clearError,tryLocalSignIn} = useContext(AuthContext)
    const {errorMessage} = state;
   useEffect(()=>{
       tryLocalSignIn();
   },[])
    return (
        <View style={styles.container}>
            <NavigationEvents onWillFocus={clearError} />
            <ImageBackground source={require('../../assets/background.jpg')} resizeMode="cover" style={styles.image}>
            <Spacer>
                <Text h1 >trackR</Text>
            </Spacer>
            <Spacer>
                <Text h3>Sign up</Text>
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
                <Button title="Sign Up" onPress={()=>{
                    console.log("button clicked")
                    signUp({email,password})}} />
            </Spacer>
            <Spacer>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}}>
                <Text style={styles.link}>Already have an account? Sign In!</Text>
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
SignupScreen.navigationOptions = { header: false }
export default SignupScreen;