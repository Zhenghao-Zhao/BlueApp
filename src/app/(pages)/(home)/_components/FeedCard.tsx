import { PostOptions } from "@/app/_components/posts/PostView";
import { Post } from "@/app/_libs/types";
import { formatDate, getAbsoluteURL } from "@/app/_libs/utils";
import Link from "next/link";
import ProfileImage from "../../[username]/_components/ProfileImage";
import { Carousel } from "@/app/_components/ui/carousel";

export function FeedCard({ post }: { post: Post }) {
  return (
    <div className="flex flex-col justify-center border-b">
      <Link href={getAbsoluteURL(`p/${post.uid}`)} scroll={false}>
        <div className="pl-2">
          <div className="flex items-center pb-4">
            <div className="mr-4">
              <ProfileImage
                imageURL={post.owner.imageURL}
                className="size-12"
              />
            </div>
            <p className="whitespace-nowrap text-ellipsis">{post.owner.name}</p>
          </div>
          {post.description && (
            <p className="flex items-center pb-2">{post.description}</p>
          )}
          <p className="text-xs text-text-secondary pb-2">
            {formatDate(post.created_at)}
          </p>
        </div>
      </Link>
      <div className="aspect-1 max-h-view-maxHeight shrink-0 rounded-lg overflow-hidden">
        <Carousel dataURLs={post.imageURLs} />
      </div>
      <PostOptions post={post} />
    </div>
  );
}

