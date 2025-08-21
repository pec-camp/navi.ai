#!/usr/bin/env tsx

import { readdir, stat, writeFile } from "fs/promises";
import { join } from "path";

interface RouteInfo {
  path: string;
  constantName: string;
  hasParams: boolean;
  params?: string[];
}

const IGNORED_PATTERNS = [
  "layout.tsx",
  "page.tsx",
  "route.ts",
  "default.tsx",
  "not-found.tsx",
  "loading.tsx",
  "error.tsx",
  "globals.css",
  "favicon.ico",
  "@", // Parallel routes
  "(.)", // Intercepting routes
  "()", // Route groups
];

const APP_FOLDER = join(process.cwd(), "src/app");
const OUTPUT_FILE = join(process.cwd(), "src/shared/config/pathname/index.ts");

function shouldIgnore(name: string): boolean {
  return IGNORED_PATTERNS.some((pattern) => {
    if (pattern.startsWith("(") || pattern.startsWith("@")) {
      return name.startsWith(pattern);
    }
    return name === pattern;
  });
}

function extractParams(segment: string): string[] {
  const params: string[] = [];
  const dynamicMatch = segment.match(/\[([^\]]+)\]/g);
  if (dynamicMatch) {
    params.push(...dynamicMatch.map((match) => match.slice(1, -1)));
  }
  return params;
}

function generateConstantName(path: string): string {
  if (path === "/") return "MAIN_PATHNAME";

  return (
    path
      .replace(/^\//, "")
      .replace(/\/\$\{([^}]+)\}/g, "_$1")
      .replace(/\//g, "_")
      .replace(/-/g, "_")
      .toUpperCase() + "_PATHNAME"
  );
}

function generatePath(segments: string[]): string {
  return (
    "/" +
    segments
      .filter((segment) => !segment.startsWith("(") && !segment.startsWith("@"))
      .map((segment) => {
        if (segment.startsWith("[") && segment.endsWith("]")) {
          const param = segment.slice(1, -1);
          return `\${${param}}`;
        }
        return segment;
      })
      .join("/")
  );
}

async function scanDirectory(
  dir: string,
  segments: string[] = [],
): Promise<RouteInfo[]> {
  const routes: RouteInfo[] = [];
  const items = await readdir(dir);

  for (const item of items) {
    if (shouldIgnore(item)) continue;

    const itemPath = join(dir, item);
    const itemStat = await stat(itemPath);

    if (itemStat.isDirectory()) {
      const newSegments = [...segments, item];

      // Check if this directory has a page.tsx (is a route)
      try {
        const dirContents = await readdir(itemPath);
        const hasPage = dirContents.includes("page.tsx");

        if (hasPage) {
          const path = generatePath(newSegments);
          const allParams = newSegments.flatMap(extractParams);

          routes.push({
            path,
            constantName: generateConstantName(path),
            hasParams: allParams.length > 0,
            params: allParams.length > 0 ? allParams : undefined,
          });
        }

        // Check for parallel routes (@) and their intercepting routes
        const parallelDirs = dirContents.filter((name) => name.startsWith("@"));
        for (const parallelDir of parallelDirs) {
          const parallelPath = join(itemPath, parallelDir);

          try {
            const parallelContents = await readdir(parallelPath);
            const interceptingDirs = parallelContents.filter((name) =>
              name.startsWith("(."),
            );

            for (const interceptDir of interceptingDirs) {
              const routeName = interceptDir.replace(/^\(\.+\)/, "");
              const interceptPath = join(parallelPath, interceptDir);

              try {
                const interceptContents = await readdir(interceptPath);
                if (interceptContents.includes("page.tsx")) {
                  const inferredSegments = [...newSegments, routeName];
                  const path = generatePath(inferredSegments);
                  const allParams = inferredSegments.flatMap(extractParams);

                  routes.push({
                    path,
                    constantName: generateConstantName(path),
                    hasParams: allParams.length > 0,
                    params: allParams.length > 0 ? allParams : undefined,
                  });
                }
              } catch {
                // Skip if we can't read the intercepting directory
              }
            }
          } catch {
            // Skip if we can't read the parallel directory
          }
        }
      } catch {
        // Skip if we can't read the directory
      }

      // Recursively scan subdirectories
      const subRoutes = await scanDirectory(itemPath, newSegments);
      routes.push(...subRoutes);
    }
  }

  return routes;
}

function generateTypeScript(routes: RouteInfo[]): string {
  const constants = routes
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((route) => {
      if (route.hasParams && route.params) {
        const paramTypes = route.params
          .map((param) => `${param}: string`)
          .join(", ");
        return `export const ${route.constantName} = (${paramTypes}) => \`${route.path}\`;`;
      } else {
        return `export const ${route.constantName} = "${route.path}";`;
      }
    })
    .join("\n");

  const routeList = routes
    .map((route) => `  ${route.constantName}`)
    .join(",\n");

  return `// Auto-generated route constants
// Run 'npm run generate:routes' to regenerate

${constants}

// Export all routes for easy access
export const ROUTES = {
${routeList}
} as const;

// Type for all static routes
export type StaticRoute = ${routes
    .filter((r) => !r.hasParams)
    .map((r) => `"${r.path}"`)
    .join(" | ")};

// Type for dynamic route functions
export type DynamicRoute = ${routes
    .filter((r) => r.hasParams)
    .map((r) => `typeof ${r.constantName}`)
    .join(" | ")};
`;
}

async function main() {
  try {
    console.log("🔍 Scanning app directory for routes...");
    const routes = await scanDirectory(APP_FOLDER);

    console.log(`📊 Found ${routes.length} routes:`);
    routes.forEach((route) => {
      console.log(`  ${route.path} → ${route.constantName}`);
    });

    console.log("📝 Generating TypeScript constants...");
    const typescript = generateTypeScript(routes);

    await writeFile(OUTPUT_FILE, typescript, "utf-8");
    console.log(`✅ Generated ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("❌ Error generating routes:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
