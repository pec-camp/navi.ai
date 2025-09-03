import { useEffect, useState } from "react";

import { getAlternativeToolList } from "@/src/entities/tool/api/getAlternativeToolList";
import type { AlternativeTool } from "@/src/entities/tool/model/AlternativeTool.interface";

type LoadState = 'idle' | 'loading' | 'success' | 'error';

interface UseAlternativeToolsOptions {
  slug: string;
  limit?: number;
  enabled?: boolean;
}

export function useAlternativeTools({
  slug,
  limit = 3,
  enabled = false,
}: UseAlternativeToolsOptions) {
  const [alternativeTools, setAlternativeTools] = useState<AlternativeTool[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const [error, setError] = useState<string | null>(null);

  const retry = () => {
    setLoadState('idle');
    setError(null);
  };

  useEffect(() => {
    if (enabled && loadState === 'idle') {
      const fetchAlternativeTools = async () => {
        setLoadState('loading');
        setError(null);
        
        try {
          const tools = await getAlternativeToolList(slug, limit);
          setAlternativeTools(tools);
          setLoadState('success');
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch alternative tools';
          console.error("Failed to fetch alternative tools:", err);
          setError(errorMessage);
          setAlternativeTools([]);
          setLoadState('error');
        }
      };

      fetchAlternativeTools();
    }
  }, [enabled, slug, limit, loadState]);

  return {
    alternativeTools,
    loadState,
    error,
    retry,
    isLoading: loadState === 'loading',
    isError: loadState === 'error',
    isSuccess: loadState === 'success',
  };
}