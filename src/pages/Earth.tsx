import ComingSoon from "@/components/ComingSoon"

export default function Earth() {
  return (
    <div className="page">
      <div className="phead">
        <h1>
          EARTH <b>OBSERVATION</b>
        </h1>

        <p>
          Sensing data and weather feeds drawn from ISRO and NASA platforms
        </p>
      </div>

      <ComingSoon
        tag="Earth Observation"
        title="Live Earth-Sensing Feed"
        desc="Imagery from Cartosat, NISAR and MOSDAC - optical, radar and ocean-colour - will show up here once the data link is switched on."
      />
    </div>
  )
}
