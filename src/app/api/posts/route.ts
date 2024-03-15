import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { PostRow, ImageRow } from "@/app/_schema";
import { randomUUID } from "crypto";
import { uploadCloudImage } from "../_utils";
import { supaInsertPost, supaInsertImages } from "../auth/_queries";

export async function POST(request: NextRequest) {
  const supabase = createRouteSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("user_id", user.id)
    .single();

  if (!data)
    return NextResponse.json(
      { message: "Cannot find user profile" },
      { status: 500 }
    );

  const username = data.username;
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  const description = formData.get("text") as string;

  if (files.length < 1) {
    return NextResponse.json({ message: "No upload images" }, { status: 500 });
  }

  const post_id = randomUUID();
  const postCol: PostRow = {
    post_id,
    username,
    description,
  };

  const { error } = await supaInsertPost(postCol);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const requests = new Array(files.length);
  const images: ImageRow[] = [];
  for (let file of files) {
    const filename = randomUUID();
    requests.push(uploadCloudImage(filename, file));
    images.push({ filename, post_id });
  }
  requests.push(supaInsertImages(images));

  try {
    Promise.all(requests);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }

  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
