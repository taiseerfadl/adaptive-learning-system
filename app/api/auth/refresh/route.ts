import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/services/auth-service";

export const runtime = "nodejs";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided" },
        { status: 401 },
      );
    }

    const tokens = await refreshAccessToken(refreshToken);
    const response = NextResponse.json({
      success: true,
      message: "Access token refreshed successfully",
    });

    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: tokens.expiresIn,
      path: "/",
    });

    response.cookies.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: tokens.refreshExpiresIn,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("REFRESH_TOKEN_ERROR:", error);

    const response = NextResponse.json(
      { success: false, message: "Invalid or expired refresh token" },
      { status: 401 },
    );

    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure,
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure,
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  }
}
