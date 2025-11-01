import { useState } from "react";
import styles from "./Checker.module.css";
import StrengthMeter from "../StrengthMeter";
import Suggestions from "../Suggestions";
import { scorePassword } from "../../utils/scorePassword";

export default function Checker() {
  const [input, setInput] = useState("");

  const result = scorePassword(input);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter password"
        className={styles.input}
      />

      {input.length === 0 ? (
        <p className={styles.helper}>Enter a password to check strength</p>
      ) : (
        <>
          <StrengthMeter score={result.score} strength={result.strength} />
          <Suggestions suggestions={result.suggestions} />
        </>
      )}
    </div>
  );
}
