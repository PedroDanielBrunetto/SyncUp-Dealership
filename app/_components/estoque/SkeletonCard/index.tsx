function SkeletonCard() {
  return (
    <div className="w-full max-w-xs p-4 flex flex-col gap-4 border border-gray-400 rounded-xl animate-pulse">
      <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
      <div className="flex flex-col gap-2">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
}

export default SkeletonCard;
