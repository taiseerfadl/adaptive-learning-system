import "dotenv/config";
import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * Authentication E2E tests for YUT-AHP.
 *
 * The test account is the Admin created by prisma/seed.ts.
 * Do not hard-code the password in the test file; provide it through
 * PLAYWRIGHT_ADMIN_PASSWORD in .env.local or the shell environment.
 */
const ADMIN_USERNAME = process.env.PLAYWRIGHT_ADMIN_USERNAME ?? "taiseer";
const ADMIN_EMAIL =
  process.env.PLAYWRIGHT_ADMIN_EMAIL ?? "taiseer.admin@yut-ahp.local";
const ADMIN_PHONE = process.env.PLAYWRIGHT_ADMIN_PHONE ?? "+967700000001";
const ADMIN_PASSWORD = process.env.PLAYWRIGHT_ADMIN_PASSWORD;

const LOGIN_PATH = "/auth/login";
const DASHBOARD_PATH = "/dashboard";

function requireAdminPassword(): string {
  if (!ADMIN_PASSWORD) {
    throw new Error(
      "PLAYWRIGHT_ADMIN_PASSWORD is not defined. Add the seeded admin password to your environment before running E2E tests.",
    );
  }

  return ADMIN_PASSWORD;
}

async function loginThroughApi(
  request: APIRequestContext,
  identifier: string,
  password = requireAdminPassword(),
  rememberMe = false,
) {
  return request.post("/api/auth/login", {
    data: {
      identifier,
      password,
      rememberMe,
    },
  });
}

async function logoutThroughApi(request: APIRequestContext) {
  return request.post("/api/auth/logout");
}

test.describe("Authentication", () => {
  test("opens the login page", async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(
      page.getByRole("heading", { name: "تسجيل الدخول" }),
    ).toBeVisible();

    await expect(
      page.getByText("استخدم البريد الإلكتروني أو اسم المستخدم أو رقم الهاتف"),
    ).toBeVisible();
  });

  test("registers a new student account and returns verification data in development", async ({
    request,
  }) => {
    const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const username = `pwstudent${unique}`;
    const email = `pwstudent${unique}@yut-ahp.local`;
    const phoneNumber = `+96771${unique.slice(-7)}`;

    const response = await request.post("/api/auth/register", {
      data: {
        name: "Playwright Student",
        username,
        email,
        phoneNumber,
        password: "Playwright!2026",
        confirmPassword: "Playwright!2026",
        role: "STUDENT",
        major: "Information Technology",
        academicLevel: "Level 4",
        academicId: `PW-${unique}`,
        institutionId: null,
        profileImageUrl: null,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.user.username).toBe(username);
    expect(body.data.user.email).toBe(email);
    expect(body.data.user.passwordHash).toBeUndefined();

    if (process.env.NODE_ENV !== "production") {
      expect(body.data.verificationToken).toBeTruthy();
      expect(body.data.phoneVerificationCode).toMatch(/^\d{6}$/);
    }
  });

  test("rejects duplicate username during registration", async ({
    request,
  }) => {
    const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const username = `pwduplicate${unique}`;
    const email = `pwduplicate${unique}@yut-ahp.local`;
    const phoneNumber = `+96772${unique.slice(-7)}`;
    const payload = {
      name: "Playwright Duplicate Test",
      username,
      email,
      phoneNumber,
      password: "Playwright!2026",
      confirmPassword: "Playwright!2026",
      role: "INSTITUTION",
      commercialRegistryNo: `PW-REG-${unique}`,
      contactPersonName: "Playwright Contact",
      profileImageUrl: null,
    };

    const firstResponse = await request.post("/api/auth/register", {
      data: payload,
    });
    expect(firstResponse.status()).toBe(201);

    const duplicateResponse = await request.post("/api/auth/register", {
      data: {
        ...payload,
        email: `another-${email}`,
        phoneNumber: `+96773${unique.slice(-7)}`,
        commercialRegistryNo: `PW-REG-2-${unique}`,
      },
    });

    expect(duplicateResponse.status()).toBe(409);

    const body = await duplicateResponse.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe("Username is already taken");
  });

  test("verifies a newly registered email with the development verification token", async ({
    request,
  }) => {
    const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const response = await request.post("/api/auth/register", {
      data: {
        name: "Playwright Email Verification",
        username: `pwverify${unique}`,
        email: `pwverify${unique}@yut-ahp.local`,
        phoneNumber: `+96774${unique.slice(-7)}`,
        password: "Playwright!2026",
        confirmPassword: "Playwright!2026",
        role: "INSTRUCTOR",
        instructorType: "INDEPENDENT",
        academicId: `PWI-${unique}`,
        institutionId: null,
        cvUrl: null,
        profileImageUrl: null,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.data.verificationToken).toBeTruthy();

    const verifyResponse = await request.post("/api/auth/verify-email", {
      data: { token: body.data.verificationToken },
    });

    expect(verifyResponse.status()).toBe(200);

    const verifyBody = await verifyResponse.json();
    expect(verifyBody.success).toBe(true);
    expect(verifyBody.data.emailVerified).toBe(true);
  });

  test("rejects public Admin registration", async ({ request }) => {
    const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const response = await request.post("/api/auth/register", {
      data: {
        name: "Playwright Admin Attempt",
        username: `pwadmin${unique}`,
        email: `pwadmin${unique}@yut-ahp.local`,
        phoneNumber: `+96775${unique.slice(-7)}`,
        password: "Playwright!2026",
        confirmPassword: "Playwright!2026",
        role: "ADMIN",
        profileImageUrl: null,
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.errors.role).toContain(
      "Admin accounts cannot be created through public registration",
    );
  });

  test("rejects invalid credentials", async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await page
      .getByLabel("البريد أو اسم المستخدم أو رقم الهاتف")
      .fill(ADMIN_USERNAME);
    await page.getByLabel("كلمة المرور").fill("WrongPassword!2026");
    await page.getByRole("button", { name: "تسجيل الدخول" }).click();

    await expect(
      page.getByText("Invalid email, username, phone number or password"),
    ).toBeVisible();

    await expect(page).toHaveURL(/\/auth\/login$/);
  });

  test("logs in with username", async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await page
      .getByLabel("البريد أو اسم المستخدم أو رقم الهاتف")
      .fill(ADMIN_USERNAME);
    await page.getByLabel("كلمة المرور").fill(requireAdminPassword());
    await page.getByRole("button", { name: "تسجيل الدخول" }).click();

    await expect(page).toHaveURL(new RegExp(`${DASHBOARD_PATH}(?:[/?]|$)`));
  });

  test("returns the authenticated user from /api/auth/me", async ({
    request,
  }) => {
    const response = await loginThroughApi(request, ADMIN_USERNAME);
    expect(response.status()).toBe(200);

    const loginBody = await response.json();
    expect(loginBody.success).toBe(true);
    expect(loginBody.user.username).toBe(ADMIN_USERNAME);
    expect(loginBody.user.role).toBe("ADMIN");

    const meResponse = await request.get("/api/auth/me");
    expect(meResponse.status()).toBe(200);

    const meBody = await meResponse.json();
    expect(meBody.authenticated).toBe(true);
    expect(meBody.user.username).toBe(ADMIN_USERNAME);
    expect(meBody.user.passwordHash).toBeUndefined();
  });

  test("logs in with email", async ({ request }) => {
    const response = await loginThroughApi(request, ADMIN_EMAIL);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.user.email).toBe(ADMIN_EMAIL);
    expect(body.user.role).toBe("ADMIN");

    await logoutThroughApi(request);
  });

  test("logs in with phone number", async ({ request }) => {
    const response = await loginThroughApi(request, ADMIN_PHONE);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.user.phoneNumber).toBe(ADMIN_PHONE);
    expect(body.user.role).toBe("ADMIN");

    await logoutThroughApi(request);
  });

  test("supports remember-me login", async ({ request }) => {
    const response = await loginThroughApi(
      request,
      ADMIN_USERNAME,
      requireAdminPassword(),
      true,
    );

    expect(response.status()).toBe(200);

    const cookies = (await request.storageState()).cookies;
    const refreshCookie = cookies.find(
      (cookie) => cookie.name === "refreshToken",
    );
    const accessCookie = cookies.find(
      (cookie) => cookie.name === "accessToken",
    );

    expect(accessCookie).toBeDefined();
    expect(refreshCookie).toBeDefined();
    expect(refreshCookie?.httpOnly).toBe(true);
    expect(accessCookie?.httpOnly).toBe(true);

    await logoutThroughApi(request);
  });

  test("refreshes the access token using the refresh token", async ({
    request,
  }) => {
    const loginResponse = await loginThroughApi(request, ADMIN_USERNAME);
    expect(loginResponse.status()).toBe(200);

    const beforeRefresh = (await request.storageState()).cookies;
    const oldAccessToken = beforeRefresh.find(
      (cookie) => cookie.name === "accessToken",
    )?.value;

    expect(oldAccessToken).toBeTruthy();

    const refreshResponse = await request.post("/api/auth/refresh");
    expect(refreshResponse.status()).toBe(200);

    const refreshBody = await refreshResponse.json();
    expect(refreshBody.success).toBe(true);

    const afterRefresh = (await request.storageState()).cookies;
    const newAccessToken = afterRefresh.find(
      (cookie) => cookie.name === "accessToken",
    )?.value;

    expect(newAccessToken).toBeTruthy();

    const meResponse = await request.get("/api/auth/me");
    expect(meResponse.status()).toBe(200);

    await logoutThroughApi(request);
  });

  test("rejects /api/auth/me without authentication", async ({ request }) => {
    const response = await request.get("/api/auth/me");
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.authenticated).toBe(false);
    expect(body.user).toBeNull();
  });

  test("rejects refresh without a refresh token", async ({ request }) => {
    const response = await request.post("/api/auth/refresh");
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe("No refresh token provided");
  });

  test("logs out and invalidates the session", async ({ request }) => {
    const loginResponse = await loginThroughApi(request, ADMIN_USERNAME);
    expect(loginResponse.status()).toBe(200);

    const meBeforeLogout = await request.get("/api/auth/me");
    expect(meBeforeLogout.status()).toBe(200);

    const logoutResponse = await logoutThroughApi(request);
    expect(logoutResponse.status()).toBe(200);

    const logoutBody = await logoutResponse.json();
    expect(logoutBody.success).toBe(true);

    const cookies = (await request.storageState()).cookies;
    expect(
      cookies.find((cookie) => cookie.name === "accessToken")?.value,
    ).toBeFalsy();
    expect(
      cookies.find((cookie) => cookie.name === "refreshToken")?.value,
    ).toBeFalsy();

    const meAfterLogout = await request.get("/api/auth/me");
    expect(meAfterLogout.status()).toBe(401);
  });

  test("validates login input", async ({ request }) => {
    const response = await request.post("/api/auth/login", {
      data: {
        identifier: "ab",
        password: "short",
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe("Invalid input data");
    expect(body.errors).toBeDefined();
  });

  test("does not expose passwordHash from /api/auth/me", async ({
    request,
  }) => {
    const loginResponse = await loginThroughApi(request, ADMIN_USERNAME);
    expect(loginResponse.status()).toBe(200);

    const response = await request.get("/api/auth/me");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.user.passwordHash).toBeUndefined();

    await logoutThroughApi(request);
  });

  test("rejects phone-code generation when unauthenticated", async ({
    request,
  }) => {
    const response = await request.post("/api/auth/send-phone-code");
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe("Authentication required");
  });

  test("rejects phone verification when unauthenticated", async ({
    request,
  }) => {
    const response = await request.post("/api/auth/verify-phone", {
      data: { code: "123456" },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe("Authentication required");
  });

  test("rejects password change when unauthenticated", async ({ request }) => {
    const response = await request.post("/api/auth/change-password", {
      data: {
        currentPassword: requireAdminPassword(),
        newPassword: "TemporaryPassword!2026",
        confirmPassword: "TemporaryPassword!2026",
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe("Authentication required");
  });

  test("validates forgot-password input", async ({ request }) => {
    const response = await request.post("/api/auth/forgot-password", {
      data: { email: "not-an-email" },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe("Invalid email address");
  });

  test("returns a generic forgot-password response for an unknown email", async ({
    request,
  }) => {
    const response = await request.post("/api/auth/forgot-password", {
      data: { email: "does-not-exist@yut-ahp.local" },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toBe(
      "If the email is registered, a password reset link will be sent.",
    );
  });

  test("rejects malformed email-verification tokens", async ({ request }) => {
    const response = await request.post("/api/auth/verify-email", {
      data: { token: "invalid-token" },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
  });

  test("keeps the legacy email-verification route alias working", async ({
    request,
  }) => {
    const response = await request.post("/api/auth/virify-email", {
      data: { token: "invalid-token" },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
  });

  test("keeps the legacy password-reset route alias working", async ({
    request,
  }) => {
    const response = await request.post("/api/auth/rest-password", {
      data: {
        token: "invalid-token",
        password: "short",
        confirmPassword: "short",
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
  });

  test("rejects malformed reset-password data", async ({ request }) => {
    const response = await request.post("/api/auth/reset-password", {
      data: {
        token: "invalid-token",
        password: "short",
        confirmPassword: "short",
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe("Invalid password reset data");
  });
});
