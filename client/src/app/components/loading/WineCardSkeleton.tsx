const WineCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-slate-100 shadow-xxs rounded">
      <header className="flex items-center p-3 gap-2 border-b border-slate-100">
        <div className="w-8 h-3.5 rounded-full bg-slate-100"></div>
        <div className="max-w-xs w-full h-3 rounded-full bg-slate-100"></div>
      </header>
      <div className="p-4 flex flex-row gap-x-6 items-center text-sm">
        <div className="w-12 h-24 mx-3 rounded-lg bg-slate-100"></div>
        <div className="flex-1">
          <div className="flex mb-3 items-center flex-row gap-2">
            <div className="w-14 h-3 rounded-full bg-slate-100"></div>
            <div className="w-8 h-3 rounded-full bg-slate-100"></div>
            <div className="w-4 h-3 rounded-full bg-slate-100"></div>
          </div>
          <ul className="space-y-1.5 max-w-xs">
            <li className="h-3 rounded-full bg-slate-100"></li>
            <li className="h-3 w-44 rounded-full bg-slate-100"></li>
            <li className="h-3 w-32 rounded-full bg-slate-100"></li>
            <li className="h-3 w-36 rounded-full bg-slate-100"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WineCardSkeleton;
