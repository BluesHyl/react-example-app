import React, { useEffect, useState, useRef } from "react";
import { usePointerPosition } from "./usePointerPosition";
interface DotProps {
    position: {
        x: number;
        y: number;
    },
    opacity: number;
}
export default function PointerTransetion() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const useDelayTransition = (position: { x: number, y: number }, delay: number) => {
        const [point, setPoint] = useState(position);
        useEffect(() => {
            setTimeout(() => {
                setPoint(position);
            }, delay);
        }, [position]);
        return point;
    }

    const point = usePointerPosition({ x: 0, y: 0 }, containerRef);
    const point2 = useDelayTransition(point, 100);
    const point3 = useDelayTransition(point2, 80);
    const point4 = useDelayTransition(point3, 60);
    const point5 = useDelayTransition(point4, 40);
    return (
        <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }} >
            <Dot position={point} opacity={1} />
            <Dot position={point2} opacity={0.8} />
            <Dot position={point3} opacity={0.6} />
            <Dot position={point4} opacity={0.4} />
            <Dot position={point5} opacity={0.2} />
        </div>
    );
    }

function Dot({ position, opacity }: DotProps) {
  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        pointerEvents: 'none',
        backgroundColor: "red",
        borderRadius: "50%",
        position: "absolute",
        transform: `translate(${position.x}px, ${position.y}px)`,
        top: -20,
        left: -20,
        opacity
      }}
    />
  );
}
