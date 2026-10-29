import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validators/auth-schema";
import { login } from "@/services/auth-service";
import { checkRateLimit } from "@/lib/auth/rate-limiter";

export const runtime = "nodejs";

function setAuthCookies(
  response: NextResponse,
  tokens: Awaited<ReturnType<typeof login>>["tokens"],
) {
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
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`login:${ip}`, {
      windowMs: 15 * 60 * 1000,
      max: 15, // max 15 login attempts per 15 min per IP
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: `تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول. يرجى الانتظار ${rateLimit.retryAfterSeconds} ثانية.`,
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "بيانات الدخول غير صحيحة",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const result = await login(validation.data);
    const response = NextResponse.json(
      {
        success: true,
        message: "تم تسجيل الدخول بنجاح",
        user: result.user,
      },
      { status: 200 },
    );

    setAuthCookies(response, result.tokens);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      const messages: Record<string, { message: string; status: number }> = {
        "Invalid credentials.": {
          message: "بيانات الدخول غير صحيحة (اسم المستخدم أو البريد أو كلمة المرور)",
          status: 401,
        },
        "This account has been suspended.": {
          message: "تم تعليق هذا الحساب. يرجى مراجعة إدارة المنصة.",
          status: 403,
        },
        "This account is inactive.": {
          message: "هذا الحساب غير نشط حالياً.",
          status: 403,
        },
        "Email address is not verified.": {
          message: "يرجى تأكيد بريدك الإلكتروني أولاً لتفعيل الحساب.",
          status: 403,
        },
        "Phone number is not verified.": {
          message: "يرجى تأكيد رقم هاتفك أولاً لتفعيل الحساب.",
          status: 403,
        },
        "Account is not verified.": {
          message: "يرجى استكمال التحقق من الحساب لتسجيل الدخول.",
          status: 403,
        },
      };

      const known = messages[error.message];

      if (known) {
        return NextResponse.json(
          { success: false, message: known.message },
          { status: known.status },
        );
      }
    }

    console.error("LOGIN_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع في الخادم" },
      { status: 500 },
    );
  }
}
