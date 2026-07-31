interface AdSlotProps {
  id: string;
  label?: string;
}

// Placeholder for a Google AdSense responsive unit. Swap the inner div for
// the real <ins class="adsbygoogle"> tag (with data-ad-client/data-ad-slot)
// once the site is AdSense-approved — approval requires real content live
// on the domain first, which is why this ships as a labeled placeholder.
export default function AdSlot({ id, label = "Advertisement" }: AdSlotProps) {
  return (
    <div
      id={id}
      data-ad-slot={id}
      aria-label={label}
      className="my-6 flex min-h-[100px] w-full items-center justify-center rounded border border-dashed border-black/20 bg-black/[0.02] text-xs text-black/40 dark:border-white/20 dark:bg-white/[0.03] dark:text-white/40"
    >
      {label} placeholder ({id})
    </div>
  );
}
