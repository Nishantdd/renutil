import React, { useState, useCallback, useEffect } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "../lib/utils";

interface LayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  showSidebar: boolean;
}

export default function Layout({ sidebar, main, showSidebar }: LayoutProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem("sidebarWidth");
    const parsed = saved ? Number.parseInt(saved) : 320;
    return isNaN(parsed) ? 320 : parsed;
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth > 250 && newWidth < 600) setWidth(newWidth);
      }
    },
    [isResizing],
  );

  useEffect(() => {
    const stopResizing = () => {
      localStorage.setItem("sidebarWidth", String(width));
      setIsResizing(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [handleMouseMove]);

  if (!showSidebar) return <div className="flex-1 overflow-hidden">{main}</div>;

  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        style={{ width: `clamp(280px, ${width}px, 25vw)` }}
        className="shrink-0 flex flex-col bg-card"
      >
        {sidebar}
      </div>

      <div className="relative w-px bg-border group">
        <div
          onMouseDown={() => setIsResizing(true)}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
            "flex h-8 w-4 items-center rounded-2xl justify-center border bg-popover",
            "cursor-col-resize transition-colors",
            isResizing
              ? "ring-4 ring-primary/20 bg-primary text-primary-foreground scale-110"
              : "hover:bg-accent",
          )}
        >
          <GripVertical className="h-3 w-3" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">{main}</div>
    </div>
  );
}
