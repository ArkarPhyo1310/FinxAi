import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div
      className="group relative rounded-2xl p-8 shadow-lg transition-all duration-300 overflow-hidden
                    glass-effect
                    hover:shadow-slate-700/50
                    border border-slate-700/50
                    h-[380px] flex flex-col"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0
                      group-hover:from-blue-900/20 group-hover:to-cyan-900/20
                      transition-all duration-300"
      ></div>

      <div className="relative z-10 flex flex-col h-full">
        {" "}
        {/* <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg flex-shrink-0"> */}
        <div className="w-14 h-14 glass-effect rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg flex-shrink-0">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl mb-3 text-sky-500 flex-shrink-0">{title}</h3>
        <p className="text-slate-300 leading-relaxed flex-grow overflow-hidden text-ellipsis text-sm">
          {description}
        </p>{" "}
        {/* Allow description to grow and truncate if needed */}
      </div>

      {/* Decorative corner element */}
      <div
        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-900/20 to-transparent
                      rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>
  );
};

export default FeatureCard;
