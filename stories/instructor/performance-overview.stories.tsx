import type { Meta, StoryObj } from "@storybook/react";
import { PerformanceOverview } from "../../components/instructor/performance-overview";

const meta: Meta<typeof PerformanceOverview> = {
  title: "INSTRUCTOR/PerformanceOverview",
  component: PerformanceOverview,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PerformanceOverview>;

export const Default: Story = {
  args: {},
};
