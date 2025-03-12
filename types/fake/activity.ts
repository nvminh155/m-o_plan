export interface Participant {
  id: string
  role: string
}

export interface Location {
  latitude: number
  longitude: number
}

export interface Activity {
  id: string
  title: string
  location: Location
  participants: Participant[]
}

export interface ActivityInfoProps {
  activity: Activity
  isCompleted: boolean
}

