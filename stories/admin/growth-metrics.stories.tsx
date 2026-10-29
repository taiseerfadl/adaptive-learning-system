import type { Meta, StoryObj } from "@storybook/react";
import { GrowthMetrics } from "../../components/admin/growth-metrics";

const meta: Meta<typeof GrowthMetrics> = {
  title: "ADMIN/GrowthMetrics",
  component: GrowthMetrics,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GrowthMetrics>;

export const Default: Story = {
  args: {},
};
