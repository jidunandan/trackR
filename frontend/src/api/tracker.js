import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const instance= axios.create({
    baseURL:'http://77ad-117-208-210-156.ngrok.io'
   // baseURL:'http://localhost:4000'
})      

instance.interceptors.request.use(
    async(config)=>{
        
        const token = await AsyncStorage.getItem('token')
        if(token)
            config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (err)=>{Promise.reject(err)}
)
export default instance;