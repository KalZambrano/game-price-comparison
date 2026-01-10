function DealSkeleton() {
  return (
    <li className="flex justify-between items-center py-2 px-4">
      {/* TITLE */}
      <div className="h-4 w-2/3 rounded bg-zinc-700/70 animate-pulse" />

      {/* PRICES */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-10 rounded bg-zinc-700/50 animate-pulse" />
        <div className="h-6 w-12 rounded bg-zinc-600 animate-pulse" />
      </div>
    </li>
  );
}

export default DealSkeleton;
