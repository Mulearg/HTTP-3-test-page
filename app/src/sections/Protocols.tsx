import { Section } from '../components/Section'
import { protocols } from '../content'
import table from '../components/DataTable.module.css'

export function Protocols() {
  return (
    <Section
      id="protocols"
      eyebrow={protocols.eyebrow}
      heading={protocols.heading}
      lede={protocols.body}
      headingWidth={900}
    >
      <div className={table.wrap}>
        <table className={table.table}>
          <thead>
            <tr>
              <th scope="col">Protocol</th>
              <th scope="col" style={{ width: 150 }}>
                Port
              </th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {protocols.rows.map((r) => (
              <tr key={r.protocol}>
                <th
                  scope="row"
                  className={r.emphasis ? `${table.colEmphasis} ${table.protocolEmphasis}` : undefined}
                >
                  {r.protocol}
                </th>
                <td style={{ width: 150 }}>{r.port}</td>
                <td className={table.note}>{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={table.chipRow} style={{ marginTop: 36 }}>
        <span className={`${table.chipText} ${table.chipTextLg}`}>{protocols.footnote}</span>
        <span className={`${table.chip} ${table.chipCode}`}>{protocols.footnoteChip}</span>
      </p>
    </Section>
  )
}
