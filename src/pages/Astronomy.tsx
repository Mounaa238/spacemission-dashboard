import ComingSoon from "@/components/ComingSoon"

export default function Astronomy() {
  return (
    <div className="page">
      <div className="phead">
        <h1>
          ASTRONOMY <b>FEED</b>
        </h1>

        <p>
          Distant-sky imagery and tracking of near-Earth objects
        </p>
      </div>

      <ComingSoon
        tag="Astronomy"
        title="Deep-Sky Data Feed"
        desc="The NASA image of the day and near-Earth asteroid passes will appear here after the astronomy service is connected."
      />
    </div>
  )
}
