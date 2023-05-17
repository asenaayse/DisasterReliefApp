import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from "../../firebase"
import { useNavigation } from '@react-navigation/core'
import HomeScreenUI from './HomeScreenUI'

const HomeScreen = () => {
  const navigation = useNavigation()
  const clickSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <HomeScreenUI
    auth = {auth}
    clickSignOut = {clickSignOut}
    />
    
  )
}
//test
export default HomeScreen

