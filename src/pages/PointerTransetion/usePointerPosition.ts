import { useState, useEffect } from "react";

export const usePointerPosition = (position: { x: number, y: number }, containerRef: React.RefObject<HTMLDivElement | null> ) => {
   const [point, setPoint] = useState(position);
   useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setPoint({ x: e.clientX - (containerRef.current?.offsetLeft || 0), y: e.clientY - (containerRef.current?.offsetTop || 0) });
    }
    containerRef.current?.addEventListener('pointermove', handleMouseMove);
    return () => {
        containerRef.current?.removeEventListener('pointermove', handleMouseMove);
    }
   }, [containerRef]);
   return point;
}