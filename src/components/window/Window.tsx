'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWindowStore } from '@/store/windowStore';
import { APPS_CONFIG } from '@/config/apps.config';
import { X, Minus, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

interface WindowProps {
  id: string;
}

export const Window: React.FC<WindowProps> = ({ id }) => {
  const {
    windows,
    closeWindow,
    focusWindow,
    activeWindowId,
    minimizeWindow,
    toggleMaximize,
    updateWindowSize,
    updateWindowPosition,
  } = useWindowStore();
  const setActiveApp = useOSStore((state) => state.setActiveApp);

  const windowData = windows[id];
  const appConfig = APPS_CONFIG[id];

  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowStartInfo = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    closeWindow(id, (nextId) => setActiveApp(nextId));
  };

  const handleMinimize = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    minimizeWindow(id, (nextId) => setActiveApp(nextId));
  };

  const handleMaximize = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    toggleMaximize(id);
  };

  // Drag logic
  const onDragStart = (e: React.MouseEvent) => {
    if (windowData.isMaximized) return;
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartInfo.current = {
      x: windowData.position.x,
      y: windowData.position.y,
      w: windowData.size.width,
      h: windowData.size.height,
    };
    focusWindow(id);
    setActiveApp(id);
    e.preventDefault();
  };

  // Resize logic
  const onResizeStart = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(direction);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartInfo.current = {
      x: windowData.position.x,
      y: windowData.position.y,
      w: windowData.size.width,
      h: windowStartInfo.current.h || windowData.size.height, // Initializing w/ fallback
    };
    // Re-calculating full info to be safe
    windowStartInfo.current = {
      x: windowData.position.x,
      y: windowData.position.y,
      w: windowData.size.width,
      h: windowData.size.height,
    };
    focusWindow(id);
    setActiveApp(id);
  };

  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      if (isDragging) {
        updateWindowPosition(
          id,
          windowStartInfo.current.x + deltaX,
          windowStartInfo.current.y + deltaY,
        );
      } else if (isResizing) {
        let newX = windowStartInfo.current.x;
        const newY = windowStartInfo.current.y;
        let newW = windowStartInfo.current.w;
        let newH = windowStartInfo.current.h;

        if (isResizing.includes('right')) {
          newW = Math.max(300, windowStartInfo.current.w + deltaX);
        }
        if (isResizing.includes('left')) {
          const possibleW = windowStartInfo.current.w - deltaX;
          if (possibleW >= 300) {
            newW = possibleW;
            newX = windowStartInfo.current.x + deltaX;
          }
        }
        if (isResizing.includes('bottom')) {
          newH = Math.max(200, windowStartInfo.current.h + deltaY);
        }

        updateWindowSize(id, newW, newH, newX, newY);
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, isResizing, id, updateWindowPosition, updateWindowSize]);

  if (!windowData || !windowData.isOpen || !appConfig) return null;

  const isActive = activeWindowId === id;
  const isMaximized = windowData.isMaximized;
  const AppComponent = appConfig.component;

  return (
    <motion.div
      id={`window-${id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: windowData.isMinimized ? 0 : 1,
        scale: windowData.isMinimized ? 0.92 : 1,
        display: windowData.isMinimized ? 'none' : 'block',
        top: isMaximized ? 0 : windowData.position.y,
        left: isMaximized ? 0 : windowData.position.x,
        width: isMaximized ? '100vw' : windowData.size.width,
        height: isMaximized ? '100vh' : windowData.size.height,
        zIndex: isMaximized ? 9999 : windowData.zIndex,
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
      className={`pointer-events-auto absolute ${
        isMaximized
          ? 'rounded-none shadow-none ring-0'
          : 'rounded-xl shadow-2xl ring-1 ring-white/10'
      }`}
      onClick={() => {
        focusWindow(id);
        setActiveApp(id);
      }}
    >
      <div
        className={`flex h-full flex-col overflow-hidden ${isMaximized ? 'rounded-none' : 'rounded-xl'} ${isActive ? 'bg-[#1e1e1e]/98' : 'bg-[#1e1e1e]/90'} backdrop-blur-3xl transition-colors duration-200`}
      >
        {/* Title Bar - Drag Handle */}
        <div
          className="group flex h-10 cursor-default items-center border-b border-white/10 bg-white/5 px-4 select-none"
          onMouseDown={onDragStart}
        >
          <div className="flex w-20 items-center space-x-2">
            <button
              onClick={handleClose}
              className="group/btn relative flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56]"
            >
              <X size={8} className="text-black/70 opacity-0 group-hover/btn:opacity-100" />
            </button>
            <button
              onClick={handleMinimize}
              className="group/btn relative flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e]"
            >
              <Minus size={8} className="text-black/70 opacity-0 group-hover/btn:opacity-100" />
            </button>
            <button
              onClick={handleMaximize}
              className="group/btn relative flex h-3 w-3 items-center justify-center rounded-full bg-[#27c93f]"
            >
              <Maximize2 size={8} className="text-black/70 opacity-0 group-hover/btn:opacity-100" />
            </button>
          </div>

          <div className="flex-1 text-center">
            <span className="text-[12px] font-bold text-zinc-300 select-none">
              {windowData.title}
            </span>
          </div>

          <div className="w-20" />
        </div>

        {/* Content Area */}
        <div className="relative flex-1 overflow-auto bg-[#1e1e1e]">
          {AppComponent ? (
            <AppComponent />
          ) : (
            <div className="p-4 text-white">App component not found for {id}</div>
          )}
        </div>

        {/* Resize Handles */}
        {!isMaximized && (
          <>
            <div
              className="absolute inset-y-0 right-0 z-[60] w-1.5 cursor-e-resize transition-colors hover:bg-blue-500/20"
              onMouseDown={onResizeStart('right')}
            />
            <div
              className="absolute inset-y-0 left-0 z-[60] w-1.5 cursor-w-resize transition-colors hover:bg-blue-500/20"
              onMouseDown={onResizeStart('left')}
            />
            <div
              className="absolute inset-x-0 bottom-0 z-[60] h-1.5 cursor-s-resize transition-colors hover:bg-blue-500/20"
              onMouseDown={onResizeStart('bottom')}
            />
            <div
              className="absolute right-0 bottom-0 z-[60] h-4 w-4 cursor-se-resize rounded-br-xl transition-colors hover:bg-blue-500/40"
              onMouseDown={onResizeStart('bottom-right')}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};
