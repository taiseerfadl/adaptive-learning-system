import type { Meta, StoryObj } from "@storybook/react";
import { InstructorDashboardStats } from "../../components/instructor/instructor-dashboard-stats";

const meta: Meta<typeof InstructorDashboardStats> = {
  title: "INSTRUCTOR/InstructorDashboardStats",
  component: InstructorDashboardStats,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstructorDashboardStats>;

export const Default: Story = {
  args: {},
};
