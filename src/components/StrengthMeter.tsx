type Props = {
  score: number;
  strength: "Weak" | "Medium" | "Strong";
};

export default function StrengthMeter({ score, strength }: Props) {
  const getColor = () => {
    if (strength === "Strong") return "#4caf50";
    if (strength === "Medium") return "#ff9800";
    return "#f44336";
  };

  return (
    <div style={{ marginTop: 12 }}>
      <div
        style={{
          height: 12,
          width: "100%",
          backgroundColor: "#ddd",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            // width: `${Math.min(score, 100)}%`,
            width: `${strength === "Strong" ? 100 : Math.min(score, 100)}%`,
            backgroundColor: getColor(),
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <p style={{ marginTop: 8, fontWeight: "bold", color: getColor() }}>
        {strength} password
      </p>
    </div>
  );
}
