import type { Meta, StoryObj } from "@storybook/react";
import { InstitutionDashboardStats } from "../../components/institution/institution-dashboard-stats";

const meta: Meta<typeof InstitutionDashboardStats> = {
  title: "INSTITUTION/InstitutionDashboardStats",
  component: InstitutionDashboardStats,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstitutionDashboardStats>;

export const Default: Story = {
  args: {},
};
