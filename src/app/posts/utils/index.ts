import { Comment, Post } from "@/app/_types";
import { QueryClient } from "@tanstack/react-query";

export function optDeletePost(
  queryClient: QueryClient,
  post: Post,
) {
  const prevData: any = queryClient.getQueryData(["posts", post.owner.uid]);
  if (!prevData) {
    window.location.reload();
    return;
  }
  const newPages = prevData.pages.map((prevPage: any ) => {
    const newPosts = prevPage.posts.filter((p: Post) => {
      return p.uid != post.uid;
    });
    return { ...prevPage, posts: newPosts };
  });
  const newData = { ...prevData, pages: newPages };
  queryClient.setQueryData(["posts", post.owner.uid], newData);
}

export async function optAddComment(
  queryClient: QueryClient,
  comment: Comment,
  queryKey: string
) {
  const prevData: any = queryClient.getQueryData(["comments", queryKey]);
  if (!prevData) {
    window.location.reload();
    return;
  }
  // add new comment to first page
  const firstPage = prevData.pages[0];
  const newPage = {
    ...firstPage,
    comments: [comment, ...firstPage.comments],
  };
  const newPages = prevData.pages.map((page: any, i: number) => {
    return i === 0 ? newPage : page;
  });
  const newData = { ...prevData, pages: newPages };
  queryClient.setQueryData(["comments", queryKey], newData);
}

export async function optUpdatePaginatedList<T>(
  listName: string,
  queryClient: QueryClient,
  update: any,
  queryKey: string,
  pageNum: number,
  index: number
) {
  await queryClient.cancelQueries({ queryKey: [listName, queryKey] });
  const prevData: any = queryClient.getQueryData([listName, queryKey]);
  if (!prevData) {
    window.location.reload();
    return;
  }
  const newPages = prevData.pages.map((prevPage: any, i: number) => {
    if (i !== pageNum) return prevPage;
    const newItems = prevPage[listName].map((prevItem: T, i: number) => {
      if (i === index) {
        return {
          ...prevItem,
          ...update,
        };
      }
      return prevItem;
    });
    return { ...prevPage, [listName]: newItems };
  });
  const newData = { ...prevData, pages: newPages };
  queryClient.setQueryData([listName, queryKey], newData);
  return { prevData, newData };
}

export async function updatePosts(
  queryClient: QueryClient,
  update: any,
  post_uid: string
) {
  await queryClient.cancelQueries({ queryKey: ["posts"] });

  queryClient.setQueriesData({queryKey: ['posts']}, (data: any) => {
    const newPages = data.pages.map((page: any) => {
      const newPosts = page.posts.map((post: Post) => post.uid === post_uid? {...post, ...update} : post);
      return {...page, posts: newPosts}
    })
    return {...data, pages: newPages};
  })

  const prevData = queryClient.getQueriesData({queryKey: ['posts']})
  return {prevData}

}
