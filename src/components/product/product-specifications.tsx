export default function ProductSpecifications({
  specs,
}: {
  specs: Record<string, any> | null;
}) {
  if (!specs || typeof specs !== "object") return null;
  const entries = Object.entries(specs);
  if (!entries.length) return null;
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([k, v]) => (
            <tr key={k} className="border-b last:border-0">
              <td className="w-1/3 bg-muted px-4 py-2 font-medium capitalize">
                {k.replaceAll("_", " ")}
              </td>
              <td className="px-4 py-2">{formatValue(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatValue(v: any): string {
  if (v == null) return "-";
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}
