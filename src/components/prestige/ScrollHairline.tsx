import { motion, MotionValue, useTransform, useReducedMotion, MotionStyle } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollHairlineProps {
  progress: MotionValue<number>;
  range?: [number, number];
  direction?: "horizontal" | "vertical";
  origin?: "left" | "right" | "top" | "bottom";
  className?: string;
  style?: MotionStyle;
  thickness?: number;
  color?: string;
}

export function ScrollHairline({
  progress,
  range = [0, 1],
  direction = "horizontal",
  origin = "left",
  className,
  thickness = 1,
  color = "bg-prestige-gold",
  style: externalStyle,
}: ScrollHairlineProps) {
  const prefersReducedMotion = useReducedMotion();
  const scale = useTransform(progress, range, [0, 1]);

  const style = {
    [direction === "horizontal" ? "scaleX" : "scaleY"]: prefersReducedMotion ? 1 : scale,
    transformOrigin: origin,
    [direction === "horizontal" ? "height" : "width"]: `${thickness}px`,
    ...externalStyle,
  };

  return (
    <motion.div
      style={style}
      className={cn(color, direction === "horizontal" ? "w-full" : "h-full", className)}
    />
  );
}
