"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { ProfileView } from "@/components/profile/profile-view";

export default function ProfileRedirectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const role = (user.role || user.accountType || "").toUpperCase();
      if (role === "STUDENT") router.replace("/student/profile");
      else if (role === "INSTRUCTOR") router.replace("/instructor/profile");
      else if (role === "INSTITUTION") router.replace("/institution/profile");
      else if (role === "ADMIN") router.replace("/admin/profile");
    } else if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <ProfileView />
    </div>
  );
}

