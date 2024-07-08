import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import IconLink from "@/app/_components/ui/buttons/iconLink";
import { useDataContext } from "@/app/_libs/contexts/providers/ServerContextProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { icons } from "../../../ui/icons";

export type GuideEntryProps = {
  icon?: string;
  title: string;
  url: string;
  className?: string;
  image?: string;
};

export function GuideEntry({ icon, title, url, image }: GuideEntryProps) {
  const { data } = useDataContext();
  const pathname = usePathname();
  return (
    <Link
      href={url ?? data.profile.username}
      className={`flex flex-shrink-0 items-center hover:bg-btn-hover-primary px-4 h-10 rounded-lg ${pathname === url && "bg-btn-hover-primary"}`}
    >
      {(icon && <div className="w-6 mr-6">{icons[icon]}</div>) || (
        <div className="mr-6">
          <ProfileImage imageURL={image} className="size-6" />
        </div>
      )}
      <div className="flex-1 text-left truncate">{title}</div>
    </Link>
  );
}

type MiniProps = {
  icon: string;
  title: string;
  url: string;
};

export function MiniGuideEntry({ icon, title, url }: MiniProps) {
  const pathname = usePathname();
  return (
    <IconLink
      href={url}
      icon={icon}
      title={title}
      className={`flex-col w-16 py-4 rounded-lg gap-[6px] ${pathname === url && "bg-btn-hover-primary"}`}
    />
  );
}
