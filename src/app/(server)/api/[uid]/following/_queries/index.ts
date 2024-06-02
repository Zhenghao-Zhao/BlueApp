import { Database } from "@/app/_libs/schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function supaGetFollowing(
  supabase: SupabaseClient<Database>,
  from_uid: string,
  uid: string,
  from: number,
  limit: number
) {
  return supabase.rpc("get_paginated_user_following", {
    arg_from_uid: from_uid,
    arg_uid: uid,
    arg_from: from,
    arg_limit: limit,
  });
}

export function supaQueryFollowing(
  supabase: SupabaseClient<Database>,
  uid: string,
  query: string,
  from: number,
  limit: number
) {
  return supabase.rpc("search_following", {
    arg_uid: uid,
    arg_query: query,
    arg_offset: from,
    arg_limit: limit,
  });
}

export function supaGetFollowingPosts(
  supabase: SupabaseClient<Database>,
  uid: string,
  from: number,
  limit: number
) {
  return supabase.rpc("get_paginated_following_posts", {
    arg_from_uid: uid,
    arg_from: from,
    arg_limit: limit,
  })
}
