export const containsMarkdown = (content: string): boolean => {
  const markdownPatterns = [
    /(^|\s)(\*|_){1,2}.*?\2($|\s)/, // Bold/italic (*text*, **text**, _text_, __text__)
    /(^|\s)#+\s/,                  // Headers (# Header)
    /(```[\s\S]*?```)/,            // Code blocks (```code```)
    /`[^`]+`/,                     // Inline code (`code`)
    /\[(.*?)\]\((.*?)\)/,          // Links ([text](url))
    /!\[(.*?)\]\((.*?)\)/,         // Images (![alt](url))
    />\s/,                         // Blockquotes (> text)
    /\n-{3,}/,                     // Horizontal rules (---)
    /\n\d+\.\s/,                   // Ordered lists (1. item)
    /\n[-*+]\s/,                   // Unordered lists (- item, * item)
  ];

  return markdownPatterns.some((pattern) => pattern.test(content));
}

export const extractLanguage = (content: string): string | undefined => {
  const match = content.match(/```(\w+)/);

  return match ? match[1] : undefined;
}