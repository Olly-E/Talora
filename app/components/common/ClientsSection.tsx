import clsx from "clsx";
import Image from "next/image";

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
            Trusted by Growing Companies
          </h3>
          <p className="text-black/90 text-sm">
            Companies working with Talora improve hiring efficiency, candidate
            quality, and overall recruitment consistency.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm">
          <div className="flex -space-x-3">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-secondary overflow-hidden flex items-center justify-center">
              <Image src="/images/logo1.jpeg" alt="Client logo" width={32} height={32} className="object-cover" />
            </div>
            <div className="w-8 h-8 rounded-full bg-white border-2 border-black overflow-hidden flex items-center justify-center">
              <Image src="/images/logo2.jpeg" alt="Client logo" width={32} height={32} className="object-cover" />
            </div>
            <div className="w-8 h-8 rounded-full bg-white border-2 border-primary overflow-hidden flex items-center justify-center">
              <Image src="/images/logo3.jpeg" alt="Client logo" width={32} height={32} className="object-cover" />
            </div>
          </div>
          <span className="text-black font-bold text-sm ml-2">80+</span>
        </div>
      </div>
    </div>
  );
}
