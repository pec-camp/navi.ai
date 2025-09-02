export const AI_TOOLS_OPTIONS = [
  // LLM & Chatbots
  { value: "chatgpt", label: "ChatGPT", category: "LLM" },
  { value: "claude", label: "Claude", category: "LLM" },
  { value: "gemini", label: "Google Gemini", category: "LLM" },
  { value: "perplexity", label: "Perplexity", category: "LLM" },
  { value: "copilot", label: "Microsoft Copilot", category: "LLM" },
  
  // Image Generation
  { value: "midjourney", label: "Midjourney", category: "Image" },
  { value: "dalle", label: "DALL-E", category: "Image" },
  { value: "stable-diffusion", label: "Stable Diffusion", category: "Image" },
  { value: "leonardo", label: "Leonardo AI", category: "Image" },
  { value: "firefly", label: "Adobe Firefly", category: "Image" },
  
  // Code Assistants
  { value: "github-copilot", label: "GitHub Copilot", category: "Code" },
  { value: "cursor", label: "Cursor", category: "Code" },
  { value: "codeium", label: "Codeium", category: "Code" },
  { value: "tabnine", label: "Tabnine", category: "Code" },
  { value: "replit", label: "Replit AI", category: "Code" },
  
  // Writing & Content
  { value: "jasper", label: "Jasper AI", category: "Writing" },
  { value: "copy-ai", label: "Copy.ai", category: "Writing" },
  { value: "writesonic", label: "Writesonic", category: "Writing" },
  { value: "notion-ai", label: "Notion AI", category: "Writing" },
  
  // Video & Audio
  { value: "runway", label: "Runway", category: "Video" },
  { value: "heygen", label: "HeyGen", category: "Video" },
  { value: "elevenlabs", label: "ElevenLabs", category: "Audio" },
  { value: "murf", label: "Murf AI", category: "Audio" },
  
  // Design Tools
  { value: "figma-ai", label: "Figma AI", category: "Design" },
  { value: "canva-ai", label: "Canva AI", category: "Design" },
  { value: "framer-ai", label: "Framer AI", category: "Design" },
  
  // Productivity
  { value: "gamma", label: "Gamma", category: "Productivity" },
  { value: "tome", label: "Tome", category: "Productivity" },
  { value: "otter", label: "Otter.ai", category: "Productivity" },
] as const;

export const AI_TOOLS_BY_CATEGORY = AI_TOOLS_OPTIONS.reduce((acc, tool) => {
  if (!acc[tool.category]) {
    acc[tool.category] = [];
  }
  acc[tool.category].push(tool);
  return acc;
}, {} as Record<string, typeof AI_TOOLS_OPTIONS[number][]>);

export const AI_TOOLS_MAP = AI_TOOLS_OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {} as Record<string, string>
);

export function getToolLabel(value: string): string {
  return AI_TOOLS_MAP[value] || value;
}