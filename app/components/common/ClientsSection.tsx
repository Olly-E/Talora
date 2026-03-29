import clsx from "clsx";

interface ClientsSectionProps {
  className?: string;
}

export default function ClientsSection({
  className = "",
}: ClientsSectionProps) {
  return (
    <div className={clsx(className, "rounded-3xl bg-primary p-8 lg:p-10")}>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-black mb-2">
            Clients across industries
          </h3>
          <p className="text-black/90 text-sm">
            Many of our clients report better hiring processes and better
            employee engagement after switching to our system
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm">
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full bg-secondary border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-black border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-primary border-2 border-white"></div>
          </div>
          <span className="text-black font-bold text-sm ml-2">80+</span>
        </div>
      </div>
    </div>
  );
}
