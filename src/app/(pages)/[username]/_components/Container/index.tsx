"use client";
import { getUserProfile } from "@/app/_api/queries";
import { Profile } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { InitData } from "../../page";
import Body from "../Body";
import Header from "../Header";

export default function Container({ initData }: { initData: InitData }) {
  const { profile, isOwner, postData } = initData;
  const { data: userData } = useQuery<Profile, AxiosError>({
    queryKey: ["userProfile", profile.uid],
    queryFn: () => getUserProfile(profile.username),
    staleTime: 1000 * 60 * 60 * 8,
    initialData: profile,
    retry: 1,
  });

  return (
    <div className="max-w-grid-maxWidth flex flex-col grow">
      <Header profile={userData} isOwner={isOwner} />
      <Body profile={userData} initialData={postData} />
    </div>
  );
}
