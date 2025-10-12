import { useCallback, useState } from "react";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function useDialog() {
  const [open, onOpenChange] = useState(false);

  const trigger = useCallback(() => {
    onOpenChange(true);
  }, [onOpenChange]);

  return { props: { open, onOpenChange }, trigger };
}
