import { PhotoColType, PostCol } from "@/app/_schema/schema";
import {
  createRouteSupabaseClient,
} from "@/app/_utility/supabase-server";
import { ENV } from "@/app/env";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  const description = formData.get("text") as string;
  const userID = formData.get("userID") as string;
  const supabase = createRouteSupabaseClient();

  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const requests = new Array(files.length);
  const post_id = randomUUID();
  const postCol: PostCol = {
    post_id,
    creator_id: userID,
    description,
  };

  const { error } = await supabase.from("Posts").insert(postCol);
  if (error) return NextResponse.json({ message: "Failed" }, { status: 500 });

  const insertData: PhotoColType[] = [];

  for (let file of files) {
    const filename = randomUUID();
    requests.push(
      fetch(ENV.R2_BUCKET_URL + "/" + filename, {
        method: "PUT",
        headers: {
          "X-Custom-Auth-Key": ENV.R2_CUSTOM_AUTH_KEY,
        },
        body: file,
      })
    );
    insertData.push({ filename, post_id });
  }

  requests.push(supabase.from("Images").insert(insertData));
  try {
    await Promise.all(requests);
    return NextResponse.json({ message: "Successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

  if (page === null || Number.isNaN(limit))
    return NextResponse.json(
      { message: "Bad page number or limit" },
      { status: 400 }
    );

  const from = parseInt(page) * limit;
  const supabase = createRouteSupabaseClient();
  const { data, error } = await supabase
    .from("Posts")
    .select(
      `
      description,
      likes_count,
      Images (
        filename
      )
    `
    )
    .range(from, from + limit - 1);

  if (!data) return NextResponse.json({ message: "Failed" }, { status: 500 });
  const nextPage = data.length 
  console.log(data, {...data})
  // console.log(data, error);
  return NextResponse.json(data, { status: 200 });
}