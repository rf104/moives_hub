function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-[#1c1c1c] animate-pulse">
          <div className="w-full h-64 bg-[#2a2a2a]" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-[#2a2a2a] rounded w-3/4" />
            <div className="h-3 bg-[#2a2a2a] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
