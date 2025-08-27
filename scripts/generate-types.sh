#!/bin/bash

# Supabase types 재생성 및 TypeScript 캐시 정리 스크립트

echo "🔄 Generating Supabase types..."
pnpm run types:generate

echo "🧹 Cleaning TypeScript cache..."
rm -rf .next/.tsbuildinfo
rm -rf node_modules/.cache/typescript

echo "✅ Done! TypeScript server should now recognize the types correctly."
echo "💡 If the issue persists in your editor:"
echo "   1. Restart TypeScript server (Cmd+Shift+P -> 'TypeScript: Restart TS Server')"
echo "   2. Or reload the window (Cmd+R in VS Code)"