import type { Meta, StoryObj } from "@storybook/react";
import { StudentDashboardStats } from "../../components/student/student-dashboard-stats";

const meta: Meta<typeof StudentDashboardStats> = {
  title: "STUDENT/StudentDashboardStats",
  component: StudentDashboardStats,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StudentDashboardStats>;

export const Default: Story = {
  args: {},
};
