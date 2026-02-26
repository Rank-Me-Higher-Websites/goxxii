import { useEffect } from "react";

interface SchemaMarkupProps {
  schemas: Record<string, unknown>[];
}

export const SchemaMarkup = ({ schemas }: SchemaMarkupProps) => {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [schemas]);

  return null;
};
