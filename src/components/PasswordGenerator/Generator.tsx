import { useEffect, useMemo, useState } from "react";
import styles from "./Generator.module.css";
import { DEFAULT_OPTIONS, generatePassword } from "../../utils/generatePassword";
import type { PasswordOptions } from "../../utils/types";
import Toast from "../Toast";
import useClipboard from "../../hooks/useClipboard";

export default function Generator() {
  const [opts, setOpts] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState<string>("");
  const { copy, copied } = useClipboard();

  const regenerate = () => {
    try {
      const pw = generatePassword(opts);
      setPassword(pw);
    } catch (e) {
      setPassword("");
      alert((e as Error).message);
    }
  };

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canGenerate = useMemo(() => {
    return opts.includeLower || opts.includeUpper || opts.includeDigits || opts.includeSymbols;
  }, [opts]);

  return (
    <>
      <div className={styles.controls}>
        <div>
          <label htmlFor="length">Length</label>
          <input
            id="length"
            type="number"
            min={12}
            max={64}
            value={opts.length}
            onChange={(e) => setOpts((o) => ({ ...o, length: Number(e.target.value) }))}
          />
          <p className="helper">Recommended: 16+</p>
        </div>

        <div className={styles.inline}>
          <input
            id="lower"
            type="checkbox"
            checked={opts.includeLower}
            onChange={(e) => setOpts((o) => ({ ...o, includeLower: e.target.checked }))}
          />
          <label htmlFor="lower">Lowercase (a-z)</label>
        </div>

        <div className={styles.inline}>
          <input
            id="upper"
            type="checkbox"
            checked={opts.includeUpper}
            onChange={(e) => setOpts((o) => ({ ...o, includeUpper: e.target.checked }))}
          />
          <label htmlFor="upper">Uppercase (A-Z)</label>
        </div>

        <div className={styles.inline}>
          <input
            id="digits"
            type="checkbox"
            checked={opts.includeDigits}
            onChange={(e) => setOpts((o) => ({ ...o, includeDigits: e.target.checked }))}
          />
          <label htmlFor="digits">Digits (0-9)</label>
        </div>

        <div className={styles.inline}>
          <input
            id="symbols"
            type="checkbox"
            checked={opts.includeSymbols}
            onChange={(e) => setOpts((o) => ({ ...o, includeSymbols: e.target.checked }))}
          />
          <label htmlFor="symbols">Symbols (!@#$...)</label>
        </div>

        <div className={styles.full}>
          <button onClick={regenerate} disabled={!canGenerate}>
            Generate password
          </button>
          {!canGenerate && <p className="helper">Select at least one character set.</p>}
        </div>
      </div>

      <div className={styles.output}>
        <input
          type="text"
          readOnly
          value={password}
          aria-label="Generated password"
        />
        <button onClick={() => copy(password)} disabled={!password}>
          Copy
        </button>
      </div>

      <Toast show={copied} message="Copied to clipboard." />
    </>
  );
}
