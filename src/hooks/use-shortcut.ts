import { useEffect } from "react";

type ShortcutHandler = (event: KeyboardEvent) => void;

interface UseShortcutOptions {
  requireCtrlOrMeta?: boolean;
  preventDefault?: boolean;
}

export function useShortcut(
  keys: string[],
  handler: ShortcutHandler,
  options: UseShortcutOptions = {}
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const matchKey = keys.map((k) => k.toLowerCase());

      const match =
        matchKey.includes(key) &&
        (!options.requireCtrlOrMeta || e.metaKey || e.ctrlKey);

      if (match) {
        if (options.preventDefault) {
          e.preventDefault();
        }
        handler(e);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, handler, options]);
}
