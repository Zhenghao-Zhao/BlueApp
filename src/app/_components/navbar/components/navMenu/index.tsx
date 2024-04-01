import { useDataContext } from "@/app/_contexts/DataContextProvider";
import { IconType } from "../../../../_assets/Icons";
import IconButton from "../../../common/buttons/IconButton";
import { IconLoader } from "../../../loaders";
import { Tooltip } from "../../../tooltip";
import Voice from "../Voice";
import Create from "./components/Create/Create";
import Notification from "./components/Notification";
import Profile from "./components/Profile";

type Props = {
  setIsOpen: (b: boolean) => void;
};

export default function HeaderMenu({ setIsOpen }: Props) {
  return (
    <div className="flex items-center">
      <Tooltip title="Search">
        <IconButton
          icon={IconType.SearchIcon}
          handleClick={() => setIsOpen(true)}
          className="sm:hidden"
        />
      </Tooltip>
      <Voice className="sm:hidden" />
      <>
        <Create />
        <Notification />
        <Profile />
      </>
    </div>
  );
}
