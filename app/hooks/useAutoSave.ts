import { useEffect, useRef, useState } from "react";
import { useDebounceValue } from "./useDebounceValue";

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

interface UseAutoSaveReturn {
  isSaving: boolean;
  lastSaved: Date | null;
  error: string | null;
}

export function useAutoSave<T>({
  data,
  onSave,
  delay = 30000, // 30 seconds default
  enabled = true,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debouncedData = useDebounceValue(data, delay);
  const isFirstRender = useRef(true);
  const previousDataRef = useRef<T>(data);

  useEffect(() => {
    // Skip on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousDataRef.current = debouncedData;
      return;
    }

    // Skip if disabled
    if (!enabled) {
      return;
    }

    // Check if data actually changed
    const hasChanged =
      JSON.stringify(debouncedData) !== JSON.stringify(previousDataRef.current);

    if (!hasChanged) {
      return;
    }

    const saveData = async () => {
      try {
        setIsSaving(true);
        setError(null);
        await onSave(debouncedData);
        setLastSaved(new Date());
        previousDataRef.current = debouncedData;
      } catch (err) {
        console.error("Auto-save error:", err);
        setError(err instanceof Error ? err.message : "Failed to auto-save");
      } finally {
        setIsSaving(false);
      }
    };

    saveData();
  }, [debouncedData, enabled, onSave]);

  return { isSaving, lastSaved, error };
}
