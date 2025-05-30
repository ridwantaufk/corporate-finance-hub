export default function TopbarSkeleton() {
  return (
    <div className="hidden lg:flex bg-[var(--body)] items-center justify-between sticky top-0 left-0 z-40 h-[3.5rem] py-2 px-4 animate-pulse">
      <div className="flex items-center justify-between space-x-4 flex-1">
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        <div className="h-8 bg-gray-300 rounded w-48"></div>
      </div>
      <div className="flex items-center space-x-4 ml-4">
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        <div className="h-8 w-36 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
