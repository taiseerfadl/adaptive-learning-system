import nodemailer from "nodemailer";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const EMAIL_FROM =
  process.env.EMAIL_FROM ??
  "النظام الموحد للتعلم التكيفي <no-reply@example.com>";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is incomplete.");
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendVerificationEmail(
  email: string,
  token: string,
): Promise<boolean> {
  const confirmLink = `${APP_URL}/auth/verify-email?token=${encodeURIComponent(token)}`;

  await getTransporter().sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: "تأكيد البريد الإلكتروني - النظام الموحد للتعلم التكيفي",
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#f8fafc;border-radius:12px">
        <h2 style="color:#60a5fa;text-align:center">مرحباً بك في منصة التعلم التكيفي</h2>
        <p style="color:#cbd5e1;line-height:1.8">يرجى الضغط على الزر التالي لتأكيد بريدك الإلكتروني:</p>
        <div style="text-align:center;margin:30px 0">
          <a href="${confirmLink}" style="background:#2563eb;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold">تأكيد البريد الإلكتروني</a>
        </div>
        <p style="font-size:12px;color:#94a3b8">إذا لم تنشئ هذا الحساب، يمكنك تجاهل هذه الرسالة.</p>
      </div>
    `,
  });

  return true;
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
): Promise<boolean> {
  const resetLink = `${APP_URL}/auth/reset-password?token=${encodeURIComponent(token)}`;

  await getTransporter().sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: "إعادة تعيين كلمة المرور - النظام الموحد للتعلم التكيفي",
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#f8fafc;border-radius:12px">
        <h2 style="color:#60a5fa;text-align:center">إعادة تعيين كلمة المرور</h2>
        <p style="color:#cbd5e1;line-height:1.8">لقد تلقينا طلباً لإعادة تعيين كلمة المرور. اضغط على الزر التالي لإكمال العملية:</p>
        <div style="text-align:center;margin:30px 0">
          <a href="${resetLink}" style="background:#2563eb;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold">إعادة تعيين كلمة المرور</a>
        </div>
        <p style="font-size:12px;color:#94a3b8">إذا لم تطلب ذلك، يمكنك تجاهل الرسالة.</p>
      </div>
    `,
  });

  return true;
}
