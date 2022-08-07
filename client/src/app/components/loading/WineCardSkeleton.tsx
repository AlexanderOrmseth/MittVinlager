const WineCardSkeleton = () => {
  return (
    <div className="shadow-xxs animate-pulse rounded border border-slate-100 bg-white">
      <header className="flex items-center gap-2 border-b border-slate-100 p-3">
        <div className="h-3.5 w-8 rounded-full bg-slate-100"></div>
        <div className="h-3 w-full max-w-xs rounded-full bg-slate-100"></div>
      </header>
      <div className="flex flex-row items-center gap-x-6 p-4 text-sm">
        <div className="mx-3 h-24 w-12 rounded-lg bg-slate-100"></div>
        <div className="flex-1">
          <div className="mb-3 flex flex-row items-center gap-2">
            <div className="h-3 w-14 rounded-full bg-slate-100"></div>
            <div className="h-3 w-8 rounded-full bg-slate-100"></div>
            <div className="h-3 w-4 rounded-full bg-slate-100"></div>
          </div>
          <ul className="max-w-xs space-y-1.5">
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
