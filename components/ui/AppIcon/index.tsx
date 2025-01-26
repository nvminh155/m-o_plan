import { IconIcons } from "@/components/icon";
import { AntDesign } from "@expo/vector-icons";

const SearchIcon = () => {
  return <AntDesign name="search1" className="text-tertiary-500" />;
};

const CloseIcon = () => {
  return <AntDesign name="close" className="text-tertiary-500" />;
};

const PlusIcon = () => {
  return <AntDesign name="plus" className="text-tertiary-500" />;
};

const NotificationOutlineIcon = () => {
  return <IconIcons name="notifications-outline" size={24} />;
};

export { SearchIcon, CloseIcon, NotificationOutlineIcon };
