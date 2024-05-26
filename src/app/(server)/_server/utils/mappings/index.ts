import { getImageURLFromFilename, getOwnerURL } from "@/app/(server)/api/_utils";
import { Friend, Post, Profile } from "@/app/_libs/types";
import { FriendData, PostData, ProfileData } from "../../types";

export function mapPostData(data: PostData, from_uid: string): Post {
  const imageURLs = data.ret_post_images?.map((filename: string) => {
    return getImageURLFromFilename(filename);
  });
  const post: Post = {
    created_at: data.ret_created_at,
    uid: data.ret_post_uid,
    description: data.ret_description,
    comment_count: data.ret_comment_count,
    likes_count: data.ret_likes_count,
    owner: {
      uid: data.ret_owner_uid,
      name: data.ret_owner_name,
      username: data.ret_owner_username,
      has_followed: data.ret_follows_owner,
      imageURL: getImageURLFromFilename(data.ret_owner_profile_image),
      bioURL: getOwnerURL(data.ret_owner_username),
    },
    has_liked: data.ret_has_liked,
    is_owner: from_uid === data.ret_owner_uid,
    imageURLs,
  };
  return post;
}

export function mapProfileData(data: ProfileData): Profile {
  const imageURL = getImageURLFromFilename(data.ret_profile_image);
  const profile: Profile = {
    uid: data.ret_uid,
    username: data.ret_username,
    name: data.ret_name,
    imageURL: imageURL,
    post_count: data.ret_post_count,
    follower_count: data.ret_follower_count,
    following_count: data.ret_following_count,
    has_followed: data.ret_has_followed,
  };
  return profile;
}

export function mapFriendData(data: FriendData): Friend {
  return {
    uid: data.ret_uid,
    username: data.ret_username,
    name: data.ret_name,
    imageURL: getImageURLFromFilename(data.ret_profile_image),
    has_followed: data.ret_has_followed,
  };
}