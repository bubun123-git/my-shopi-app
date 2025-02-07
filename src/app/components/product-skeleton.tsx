export default function ProductSkeleton() {
    return (
      <div className="border rounded-lg p-4 flex flex-col animate-pulse">
        <div className="bg-gray-300 h-48 w-full mb-4 rounded"></div>
        <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
        <div className="bg-gray-300 h-3 w-full mb-2"></div>
        <div className="bg-gray-300 h-3 w-full mb-2"></div>
        <div className="flex justify-between items-center mb-2">
          <div className="bg-gray-300 h-4 w-1/4"></div>
          <div className="bg-gray-300 h-4 w-1/4"></div>
        </div>
        <div className="bg-gray-300 h-10 w-full rounded-md"></div>
      </div>
    )
  }
  
  