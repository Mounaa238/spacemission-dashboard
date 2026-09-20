export type Agency = "ISRO" | "NASA"

export type MissionStatus =
  | "Active"
  | "Completed"
  | "Planned"
  | "Failed"

export interface Mission {
  id: string
  name: string
  agency: Agency
  year: number
  status: MissionStatus
  category: string
  description: string
}

export interface Sat {
  id: string
  name: string
  agency: Agency
  type: string
  altitudeKm: number
  purpose: string
  color: string
  orbit: {
    radius: number
    speed: number
    phase: number
    inclination: number
  }
}
