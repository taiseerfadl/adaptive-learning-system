import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validators/auth-schema";
import { register } from "@/services/auth-service";
import { generateScopedToken } from "@/lib/auth/jwt";
import { checkRateLimit } from "@/lib/auth/rate-limiter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`register:${ip}`, {
      windowMs: 60 * 60 * 1000,
      max: 10,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many registration attempts. Please wait ${rateLimit.retryAfterSeconds} seconds.`,
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const result = await register(validation.data);

    // Generate short-lived scoped token for verification step
    const verificationScopedToken = generateScopedToken(
      result.user.id,
      result.contactMethod === "email" ? "email_verification" : "phone_verification",
      15 * 60,
    );

    const isDevelopment = process.env.NODE_ENV !== "production";

    return NextResponse.json(
      {
        success: true,
        message:
          result.contactMethod === "email"
            ? "تم إنشاء الحساب بنجاح. يرجى إدخال رمز التحقق المرسل إلى بريدك الإلكتروني."
            : "تم إنشاء الحساب بنجاح. يرجى إدخال رمز التحقق المرسل إلى هاتفك.",
        data: {
          user: result.user,
          contactMethod: result.contactMethod,
          verificationToken: verificationScopedToken,
          ...(isDevelopment
            ? {
                devCode: result.verificationCode,
              }
            : {}),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      const conflicts: Record<string, string> = {
        "Email is already registered.": "Email is already registered",
        "Username is already in use.": "Username is already taken",
        "Phone number is already registered.":
          "Phone number is already registered",
        "Commercial registry number is already registered.":
          "Commercial registry number is already registered",
      };

      if (conflicts[error.message]) {
        return NextResponse.json(
          { success: false, message: conflicts[error.message] },
          { status: 409 },
        );
      }
    }

    console.error("REGISTER_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

