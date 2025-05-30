import { useNeumorph } from "@/contexts/NeumorphContext";

const ProfileHeaderSkeleton = () => {
  const { isNeumorphism } = useNeumorph();

  return (
    <div
      className={`${
        isNeumorphism ? "neumorphic-convex p-0.5" : ""
      } relative rounded-lg mb-2 animate-pulse`}
    >
      <section className="p-3 rounded-lg bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="flex flex-wrap flex-col md:flex-row md:items-start md:space-x-4">
          <div className="relative flex-shrink-0 mb-4 md:mb-0">
            <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="flex-1">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="mt-44 w-full">
          <div className="flex justify-between">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileHeaderSkeleton;
