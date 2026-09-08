import styles from './CodeBlock.module.css'

/** A token in one line of the sample: comment, call, string, or plain text. */
type Token = { c?: string; fn?: string; str?: string; t?: string }

/**
 * One of the two permitted JetBrains Mono blocks.
 *
 * Lines arrive pre-tokenised from content.ts so the artboard's syntax colours
 * survive without pulling in a highlighter — the sample is fixed, so parsing
 * it at runtime would be work for no gain.
 */
export function CodeBlock({ lines, label }: { lines: readonly Token[][]; label?: string }) {
  return (
    <div className={styles.block}>
      <img className={styles.dots} src="/assets/icons/code-dots.svg" alt="" width={47} height={11} />
      <pre className={styles.pre} aria-label={label}>
        <code className={styles.code}>
          {lines.map((line, i) => (
            <span key={i}>
              {line.length === 0
                ? '​'
                : line.map((tok, j) => {
                    if (tok.c) return <span key={j} className={styles.comment}>{tok.c}</span>
                    if (tok.fn) return <span key={j} className={styles.fn}>{tok.fn}</span>
                    if (tok.str) return <span key={j} className={styles.str}>{tok.str}</span>
                    return <span key={j}>{tok.t}</span>
                  })}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
