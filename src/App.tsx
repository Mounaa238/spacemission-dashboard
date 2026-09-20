import {
  Routes,
  Route,
} from "react-router-dom"

import Rail from "@/components/Rail"
import TopBar from "@/components/TopBar"

import Overview from "@/pages/Overview"
import Missions from "@/pages/Missions"
import Satellites from "@/pages/Satellites"
import Earth from "@/pages/Earth"
import Astronomy from "@/pages/Astronomy"

export default function App() {
  return (
    <div className="app">
      <Rail />

      <div className="console">
        <TopBar />

        <Routes>
          <Route
            path="/"
            element={<Overview />}
          />

          <Route
            path="/missions"
            element={<Missions />}
          />

          <Route
            path="/satellites"
            element={<Satellites />}
          />

          <Route
            path="/earth"
            element={<Earth />}
          />

          <Route
            path="/astronomy"
            element={<Astronomy />}
          />
        </Routes>
      </div>
    </div>
  )
}
