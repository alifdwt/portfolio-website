"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
}

export default function CodeBlock({
  children,
  className,
  language,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const extractedLanguage =
    className?.replace("language-", "") || language || "text";

  return (
    <div className="group relative my-6">
      <pre
        className={`overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100 ${
          className || ""
        }`}
      >
        <code className="font-mono text-sm">{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded bg-gray-800 p-2 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-700"
        title="Copy code"
        type="button"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      {extractedLanguage && extractedLanguage !== "text" && (
        <div className="absolute right-2 bottom-2 rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 opacity-75">
          {extractedLanguage}
        </div>
      )}
    </div>
  );
}
