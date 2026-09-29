import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMedia } from "@/hooks/use-media";

interface MediaSlotProps {
  mediaKey: string;
  className?: string;
  aspectRatio?: string;
  placeholderColor?: string;
  number?: string;
}

export function MediaSlot({
  mediaKey,
  className,
  aspectRatio = "aspect-[4/3]",
  placeholderColor = "bg-prestige-charcoal/5",
  number,
}: MediaSlotProps) {
  const media = useMedia(mediaKey);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[12px] border border-prestige-charcoal/5",
        aspectRatio,
        className,
      )}
      data-media-key={mediaKey}
    >
      {media ? (
        <motion.img
          src={media.url}
          alt={media.alt}
          initial={false}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.015]"
          loading="lazy"
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center border border-prestige-charcoal/10",
            placeholderColor,
          )}
        >
          <div className="h-[1px] w-12 bg-prestige-charcoal/20 mb-4" />
          {number && (
            <span className="text-4xl font-light text-prestige-charcoal/5 select-none">
              {number}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
