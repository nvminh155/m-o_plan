import TestApiAttraction from '@/components/testapi/api-attraction-screen'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import React from 'react'

const ScheduleScreen = () => {
  return (
    <VStack className='flex-1 px-4'>
      <VStack className='mt-4'></VStack>
      <TestApiAttraction />
    </VStack>
  )
}

export default ScheduleScreen