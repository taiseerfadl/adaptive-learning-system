import { z } from "zod";
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must not exceed 100 characters")
  .regex(/[A-Za-z]/, "Password must contain at least one English letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number is too short")
  .max(20, "Phone number is too long")
  .regex(/^\+?[0-9][0-9\s()-]{5,18}[0-9]$/, "Invalid phone number");

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Identifier must be at least 3 characters")
    .max(100, "Identifier is too long"),
  password: passwordSchema,
  rememberMe: z.boolean().optional().default(false),
});

export const registerSchema = z
  .object({
    role: z.enum(["STUDENT", "INSTRUCTOR", "INSTITUTION"]),
    name: z.string().trim().max(100).optional().nullable(),
    username: z
      .string()
      .trim()
      .min(3, "اسم المستخدم يجب ألا يقل عن 3 أحرف")
      .max(50, "اسم المستخدم يجب ألا يتجاوز 50 حرفًا")
      .regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يجب أن يحتوي فقط على أحرف إنجليزية وأرقام وعلامة _"),
    password: passwordSchema,
    confirmPassword: z.string(),

    // Contact method: exactly one of phone or email
    contactMethod: z.enum(["phone", "email"]).optional(),
    phoneNumber: phoneSchema.optional().nullable(),
    email: z.string().trim().email("صيغة البريد الإلكتروني غير صالحة").max(100).optional().nullable(),

    // Institution specific
    institutionName: z.string().trim().max(100).optional().nullable(),
    contactPersonName: z.string().trim().max(100).optional().nullable(),
    subscriptionPlan: z.enum(["monthly", "six_months", "yearly"]).optional().default("monthly"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "كلمة المرور وتأكيدها غير متطابقين",
      });
    }

    const hasPhone = Boolean(data.phoneNumber && data.phoneNumber.trim());
    const hasEmail = Boolean(data.email && data.email.trim());

    if (!hasPhone && !hasEmail) {
      ctx.addIssue({
        code: "custom",
        path: ["phoneNumber"],
        message: "يجب إدخال وسيلة تواصل واحدة صالحة (رقم الهاتف أو البريد الإلكتروني)",
      });
    }

    if (data.role === "INSTITUTION") {
      if (!data.contactPersonName || !data.contactPersonName.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["contactPersonName"],
          message: "اسم مسؤول التواصل مطلوب للمؤسسة",
        });
      }
    }
  });

export const verifyEmailSchema = z.object({
  token: z.string().optional(),
  code: z.string().regex(/^\d{6}$/, "رمز التحقق يجب أن يتكون من 6 أرقام").optional(),
  userId: z.number().int().positive().optional(),
  email: z.string().trim().email().optional(),
  verificationToken: z.string().optional(),
});

export const verifyPhoneSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Verification code must contain 6 digits"),
  userId: z.number().int().positive().optional(),
  phoneNumber: z.string().trim().optional(),
  verificationToken: z.string().optional(),
});

export const sendPhoneCodeSchema = z.object({
  userId: z.number().int().positive().optional(),
  phoneNumber: z.string().trim().optional(),
  verificationToken: z.string().optional(),
});

export const forgotPasswordSchema = z
  .object({
    email: z.string().trim().optional(),
    identifier: z.string().trim().optional(),
  })
  .refine((data) => Boolean(data.email?.trim() || data.identifier?.trim()), {
    message: "يرجى إدخال البريد الإلكتروني أو اسم المستخدم أو رقم الهاتف",
    path: ["identifier"],
  });

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type VerifyPhoneInput = z.infer<typeof verifyPhoneSchema>;
export type SendPhoneCodeInput = z.infer<typeof sendPhoneCodeSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
