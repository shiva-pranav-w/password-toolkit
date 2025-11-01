type Props = { show: boolean; message: string };

export default function Toast({ show, message }: Props) {
  if (!show) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        background: "#111827",
        border: "1px solid #374151",
        color: "#e5e7eb",
        padding: "8px 12px",
        borderRadius: 8,
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      {message}
    </div>
  );
}
