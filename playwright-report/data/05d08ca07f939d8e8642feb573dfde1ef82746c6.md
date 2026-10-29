# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-flow.spec.ts >> Authentication >> rejects phone verification when unauthenticated
- Location: tests\e2e\auth-flow.spec.ts:400:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 401
```

# Test source

```ts
  305 |     expect(refreshResponse.status()).toBe(200);
  306 | 
  307 |     const refreshBody = await refreshResponse.json();
  308 |     expect(refreshBody.success).toBe(true);
  309 | 
  310 |     const afterRefresh = (await request.storageState()).cookies;
  311 |     const newAccessToken = afterRefresh.find(
  312 |       (cookie) => cookie.name === "accessToken"
  313 |     )?.value;
  314 | 
  315 |     expect(newAccessToken).toBeTruthy();
  316 | 
  317 |     const meResponse = await request.get("/api/auth/me");
  318 |     expect(meResponse.status()).toBe(200);
  319 | 
  320 |     await logoutThroughApi(request);
  321 |   });
  322 | 
  323 |   test("rejects /api/auth/me without authentication", async ({ request }) => {
  324 |     const response = await request.get("/api/auth/me");
  325 |     expect(response.status()).toBe(401);
  326 | 
  327 |     const body = await response.json();
  328 |     expect(body.authenticated).toBe(false);
  329 |     expect(body.user).toBeNull();
  330 |   });
  331 | 
  332 |   test("rejects refresh without a refresh token", async ({ request }) => {
  333 |     const response = await request.post("/api/auth/refresh");
  334 |     expect(response.status()).toBe(401);
  335 | 
  336 |     const body = await response.json();
  337 |     expect(body.success).toBe(false);
  338 |     expect(body.message).toBe("No refresh token provided");
  339 |   });
  340 | 
  341 |   test("logs out and invalidates the session", async ({ request }) => {
  342 |     const loginResponse = await loginThroughApi(request, ADMIN_USERNAME);
  343 |     expect(loginResponse.status()).toBe(200);
  344 | 
  345 |     const meBeforeLogout = await request.get("/api/auth/me");
  346 |     expect(meBeforeLogout.status()).toBe(200);
  347 | 
  348 |     const logoutResponse = await logoutThroughApi(request);
  349 |     expect(logoutResponse.status()).toBe(200);
  350 | 
  351 |     const logoutBody = await logoutResponse.json();
  352 |     expect(logoutBody.success).toBe(true);
  353 | 
  354 |     const cookies = (await request.storageState()).cookies;
  355 |     expect(cookies.find((cookie) => cookie.name === "accessToken")?.value).toBeFalsy();
  356 |     expect(cookies.find((cookie) => cookie.name === "refreshToken")?.value).toBeFalsy();
  357 | 
  358 |     const meAfterLogout = await request.get("/api/auth/me");
  359 |     expect(meAfterLogout.status()).toBe(401);
  360 |   });
  361 | 
  362 |   test("validates login input", async ({ request }) => {
  363 |     const response = await request.post("/api/auth/login", {
  364 |       data: {
  365 |         identifier: "ab",
  366 |         password: "short",
  367 |       },
  368 |     });
  369 | 
  370 |     expect(response.status()).toBe(400);
  371 | 
  372 |     const body = await response.json();
  373 |     expect(body.success).toBe(false);
  374 |     expect(body.message).toBe("Invalid input data");
  375 |     expect(body.errors).toBeDefined();
  376 |   });
  377 | 
  378 |   test("does not expose passwordHash from /api/auth/me", async ({ request }) => {
  379 |     const loginResponse = await loginThroughApi(request, ADMIN_USERNAME);
  380 |     expect(loginResponse.status()).toBe(200);
  381 | 
  382 |     const response = await request.get("/api/auth/me");
  383 |     expect(response.status()).toBe(200);
  384 | 
  385 |     const body = await response.json();
  386 |     expect(body.user.passwordHash).toBeUndefined();
  387 | 
  388 |     await logoutThroughApi(request);
  389 |   });
  390 | 
  391 |   test("rejects phone-code generation when unauthenticated", async ({ request }) => {
  392 |     const response = await request.post("/api/auth/send-phone-code");
  393 |     expect(response.status()).toBe(401);
  394 | 
  395 |     const body = await response.json();
  396 |     expect(body.success).toBe(false);
  397 |     expect(body.message).toBe("Authentication required");
  398 |   });
  399 | 
  400 |   test("rejects phone verification when unauthenticated", async ({ request }) => {
  401 |     const response = await request.post("/api/auth/verify-phone", {
  402 |       data: { code: "123456" },
  403 |     });
  404 | 
> 405 |     expect(response.status()).toBe(400);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  406 | 
  407 |     const body = await response.json();
  408 |     expect(body.success).toBe(false);
  409 |     expect(body.message).toBe("Authentication required");
  410 |   });
  411 | 
  412 |   test("rejects password change when unauthenticated", async ({ request }) => {
  413 |     const response = await request.post("/api/auth/change-password", {
  414 |       data: {
  415 |         currentPassword: requireAdminPassword(),
  416 |         newPassword: "TemporaryPassword!2026",
  417 |         confirmPassword: "TemporaryPassword!2026",
  418 |       },
  419 |     });
  420 | 
  421 |     expect(response.status()).toBe(401);
  422 | 
  423 |     const body = await response.json();
  424 |     expect(body.success).toBe(false);
  425 |     expect(body.message).toBe("Authentication required");
  426 |   });
  427 | 
  428 |   test("validates forgot-password input", async ({ request }) => {
  429 |     const response = await request.post("/api/auth/forgot-password", {
  430 |       data: { email: "not-an-email" },
  431 |     });
  432 | 
  433 |     expect(response.status()).toBe(400);
  434 | 
  435 |     const body = await response.json();
  436 |     expect(body.success).toBe(false);
  437 |     expect(body.message).toBe("Invalid email address");
  438 |   });
  439 | 
  440 |   test("returns a generic forgot-password response for an unknown email", async ({ request }) => {
  441 |     const response = await request.post("/api/auth/forgot-password", {
  442 |       data: { email: "does-not-exist@yut-ahp.local" },
  443 |     });
  444 | 
  445 |     expect(response.status()).toBe(200);
  446 | 
  447 |     const body = await response.json();
  448 |     expect(body.success).toBe(true);
  449 |     expect(body.message).toBe(
  450 |       "If the email is registered, a password reset link will be sent."
  451 |     );
  452 |   });
  453 | 
  454 |   test("rejects malformed email-verification tokens", async ({ request }) => {
  455 |     const response = await request.post("/api/auth/verify-email", {
  456 |       data: { token: "invalid-token" },
  457 |     });
  458 | 
  459 |     expect(response.status()).toBe(400);
  460 | 
  461 |     const body = await response.json();
  462 |     expect(body.success).toBe(false);
  463 |   });
  464 | 
  465 | 
  466 |   test("keeps the legacy email-verification route alias working", async ({ request }) => {
  467 |     const response = await request.post("/api/auth/virify-email", {
  468 |       data: { token: "invalid-token" },
  469 |     });
  470 | 
  471 |     expect(response.status()).toBe(400);
  472 |     const body = await response.json();
  473 |     expect(body.success).toBe(false);
  474 |   });
  475 | 
  476 |   test("keeps the legacy password-reset route alias working", async ({ request }) => {
  477 |     const response = await request.post("/api/auth/rest-password", {
  478 |       data: {
  479 |         token: "invalid-token",
  480 |         password: "short",
  481 |         confirmPassword: "short",
  482 |       },
  483 |     });
  484 | 
  485 |     expect(response.status()).toBe(400);
  486 |     const body = await response.json();
  487 |     expect(body.success).toBe(false);
  488 |   });
  489 | 
  490 |   test("rejects malformed reset-password data", async ({ request }) => {
  491 |     const response = await request.post("/api/auth/reset-password", {
  492 |       data: {
  493 |         token: "invalid-token",
  494 |         password: "short",
  495 |         confirmPassword: "short",
  496 |       },
  497 |     });
  498 | 
  499 |     expect(response.status()).toBe(400);
  500 | 
  501 |     const body = await response.json();
  502 |     expect(body.success).toBe(false);
  503 |     expect(body.message).toBe("Invalid password reset data");
  504 |   });
  505 | 
```