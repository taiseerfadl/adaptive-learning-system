import type { Meta, StoryObj } from "@storybook/react";
import { AdminDashboardStats } from "../../components/admin/admin-dashboard-stats";

const meta: Meta<typeof AdminDashboardStats> = {
  title: "ADMIN/AdminDashboardStats",
  component: AdminDashboardStats,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AdminDashboardStats>;

export const Default: Story = {
  args: {},
};
