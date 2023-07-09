import Showdown from "showdown";
import { createSignal, onCleanup, onMount } from "solid-js";

interface MarkdownRendererProps {
  markdown: string;
}

function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const [html, setHtml] = createSignal("");

  onCleanup(() => {
    // Clean up any resources if needed
  });

  // Convert the Markdown text to HTML when the component mounts
  onMount(() => {
    if (markdown) {
      setHtml(convertToHtml(markdown));
    }
  });

  function convertToHtml(markdown: string): string {
    // Customizable Markdown-to-HTML conversion rules
    const rules = [
      { pattern: /# (.+)/g, replacement: "<h1>$1</h1>" },
      { pattern: /## (.+)/g, replacement: "<h2>$1</h2>" },
      { pattern: /### (.+)/g, replacement: "<h3>$1</h3>" },
      { pattern: /#### (.+)/g, replacement: "<h4>$1</h4>" },
      { pattern: /##### (.+)/g, replacement: "<h5>$1</h5>" },
      { pattern: /###### (.+)/g, replacement: "<h6>$1</h6>" },
      { pattern: /\*\*(.+?)\*\*/g, replacement: "<strong>$1</strong>" },
      { pattern: /\*(.+?)\*/g, replacement: "<em>$1</em>" },
      { pattern: /`(.+?)`/g, replacement: "<code>$1</code>" },
      {
        pattern: /!\[(.*?)\]\((.*?)\)/g,
        replacement: '<img alt="$1" src="$2">',
      },
      { pattern: /\---/g, replacement: "<hr />" },
      // Add more rules as needed
    ];

    let htmlText = "";
    for (const rule of rules) {
      htmlText = markdown.replace(rule.pattern, rule.replacement);
    }
    return htmlText;
  }

  return <div innerHTML={html()} />;
}

export default MarkdownRenderer;
