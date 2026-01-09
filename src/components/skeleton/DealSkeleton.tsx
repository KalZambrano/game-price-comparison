function DealSkeleton() {
  return (
    <li className="flex justify-between items-center py-2 px-4">
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />

      <div className="flex items-center gap-2">
        <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-12 bg-gray-300 rounded animate-pulse" />
      </div>
    </li>
  );
}

export default DealSkeleton;