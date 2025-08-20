interface CalloutProps {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  children: React.ReactNode;
}

export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
  };

  const icons = {
    info: "💡",
    warning: "⚠️",
    error: "🚨",
    success: "✅",
  };

  return (
    <div className={`my-4 rounded-r-lg border-l-4 p-4 ${styles[type]}`}>
      {title && (
        <div className="mb-2 flex items-center font-semibold">
          <span className="mr-2">{icons[type]}</span>
          {title}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
