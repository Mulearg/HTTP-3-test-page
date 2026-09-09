import { Section } from '../components/Section'
import { comparison } from '../content'
import table from '../components/DataTable.module.css'

export function Comparison() {
  return (
    <Section id="comparison" ground="band" heading={comparison.heading} centered headingWidth={780}>
      <div className={table.wrap}>
        <table className={table.table}>
          <thead>
            <tr>
              {comparison.columns.map((c, i) => (
                <th key={i} scope="col" className={i === 3 ? table.headEmphasis : undefined}>
                  {c || <span className="visually-hidden">Property</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className={table.rowLabel}>
                  {row.label}
                </th>
                {row.cells.map((cell, i) => {
                  const isHttp3 = i === 2
                  return (
                    <td
                      key={i}
                      className={[
                        isHttp3 ? table.colEmphasis : '',
                        isHttp3 && row.affirmative ? table.affirmative : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The artboard ships a footnote here carrying a [YOUR BENCHMARK NUMBERS]
          placeholder chip. Removed by request — no performance figures were
          ever published to fill it, so the line only ever advertised a gap.
          The copy is still in content.ts (comparison.footnote) if it is ever
          wanted back with real numbers. */}
    </Section>
  )
}
