import {
  Cog6ToothIcon,
  HomeIcon,
  SwatchIcon,
  TagIcon,
  TvIcon,
} from "@heroicons/react/24/outline";

export default function Tags({ item }: { itme: [string, unknown, string] }) {
  const chooseItems = (item: [string, unknown]) => {
    switch (item[0]) {
      case "electronics":
        if (item[1] === true) {
          return (
            <p className="bg-gray-800 px-2 py-1 rounded-full">
              <TvIcon className="h-6 w-6 stroke-white" />
            </p>
          );
        }
        break;
      case "fashion":
        if (item[1] === true) {
          return (
            <p className="bg-gray-800 px-2 py-1 rounded-full">
              <TagIcon className="h-6 w-6 stroke-white" />
            </p>
          );
        }
        break;
      case "home_garden":
        if (item[1] === true) {
          return (
            <p className="bg-gray-800 px-2 py-1 rounded-full">
              <HomeIcon className="h-6 w-6 stroke-white" />
            </p>
          );
        }
        break;
      case "automotive":
        if (item[1] === true) {
          return (
            <p className="bg-gray-800 px-2 py-1 rounded-full">
              <Cog6ToothIcon className="h-6 w-6 stroke-white" />
            </p>
          );
        }
        break;
      case "health_beauty":
        if (item[1] === true) {
          return (
            <p className="bg-gray-800 px-2 py-1 rounded-full">
              <SwatchIcon className="h-6 w-6 stroke-white" />
            </p>
          );
        }
        break;
      default:
        break;
    }
  };
  return <>{chooseItems(item)}</>;
}
