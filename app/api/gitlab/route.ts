import { NextRequest, NextResponse } from "next/server";

// Server-side proxy for GitLab GraphQL API. This route reads GITLAB_TOKEN from
// the environment and forwards GraphQL queries to GitLab. It prevents exposing
// the token to the browser.

export async function POST(req: NextRequest) {
  const GITLAB_API =
    process.env.GITLAB_API_URL ?? "https://gitlab.com/api/graphql";
  const token = process.env.GITLAB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Missing server-side GITLAB_TOKEN" },
      { status: 500 }
    );
  }

  const body = await req.text();

  try {
    const resp = await fetch(GITLAB_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const text = await resp.text();
    return new NextResponse(text, {
      status: resp.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Proxy error", detail: String(err) },
      { status: 500 }
    );
  }
}
