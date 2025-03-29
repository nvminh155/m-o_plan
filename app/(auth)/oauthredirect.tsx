import { Redirect } from 'expo-router'
import React from 'react'

const oauthredirect = () => {

  return (
    <Redirect href="/(tabs)/(home)" />
  )
}

export default oauthredirect