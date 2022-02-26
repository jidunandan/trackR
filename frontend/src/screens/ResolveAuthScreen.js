import React,{useEffect,useContext} from 'react'
import {View,Text} from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'

const ResolveAuthScreen = ()=>{
    const {tryLocalSignIn} = useContext(AuthContext)
    useEffect(()=>{
        tryLocalSignIn()
    },[])
    return(
        <View>
            <Text>Loading...Keep Running....</Text>
        </View>
    )
}
export default ResolveAuthScreen