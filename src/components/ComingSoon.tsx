interface Props {
  tag: string
  title: string
  desc: string
}

export default function ComingSoon({
  tag,
  title,
  desc,
}: Props) {
  return (
    <section className="panel">
      <div className="p-head">
        <span className="tag">{tag}</span>
        <span className="rt">Offline</span>
      </div>

      <div className="p-body coming">
        <div className="radar"></div>

        <span className="tag">
          Coming Soon
        </span>

        <h2>{title}</h2>

        <p>{desc}</p>

        <div className="meterline">
          <span>INTEGRATION</span>

          <span className="track2">
            <i></i>
          </span>

          <span>38%</span>
        </div>
      </div>
    </section>
  )
}
