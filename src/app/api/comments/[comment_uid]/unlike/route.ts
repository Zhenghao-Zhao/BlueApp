import { createClient } from "@/app/_libs/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { supaRemoveLikeToComment } from "../../_queries";

export async function POST(
  request: NextRequest,
  { params: { comment_uid } }: { params: { comment_uid: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const uid = user.id;
  const { data, error } = await supaRemoveLikeToComment(
    supabase,
    comment_uid,
    uid
  );
  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ data }, { status: 200 });
}