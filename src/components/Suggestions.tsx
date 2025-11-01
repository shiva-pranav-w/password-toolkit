type Props = {
  suggestions: string[];
};

export default function Suggestions({ suggestions }: Props) {
  if (suggestions.length === 0) return null;

  return (
    <ul style={{ marginTop: 12, paddingLeft: 20 }}>
      {suggestions.map((s, i) => (
        <li key={i} style={{ color: "#ccc", fontSize: 14 }}>
          {s}
        </li>
      ))}
    </ul>
  );
}
