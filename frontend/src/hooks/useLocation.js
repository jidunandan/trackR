import { useState, useEffect } from 'react'
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location'


export default (shouldTrack, callback) => {
    const [err, setErr] = useState('')
    const [sub, setSubscriber] = useState(null)
    const startWatching = async () => {
        try {
            const { granted } = await requestForegroundPermissionsAsync();
            const subscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, (location) => {
                setSubscriber(subscriber)
                //console.log(location)
                callback(location)
            })
            if (!granted) {
                throw new Error('Location permission not granted');
            }
        }
        catch (e) {
            setErr(e);
        }
    }
    useEffect(() => {
        if (shouldTrack)
            startWatching()
        else {
            sub.remove()
            setSubscriber(null)
        }
        return () => {
            if (sub) {
                sub.remove()
            }
        }
    }, [shouldTrack, callback])

    return [err]
}