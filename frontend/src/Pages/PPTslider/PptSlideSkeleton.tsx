





function PptSlideSkeleton() {
  return (
    <div
      className="w-full h-[300px] mb-6 rounded-xl bg-gray-200 animate-pulse p-6"
    >
      <div className="h-8 w-1/3 bg-gray-300 rounded mb-4" />
      <div className="h-4 w-full bg-gray-300 rounded mb-2" />
      <div className="h-4 w-5/6 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-4/6 bg-gray-300 rounded" />
    </div>
  );
}

export default PptSlideSkeleton;
