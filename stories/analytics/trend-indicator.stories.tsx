import type { Meta, StoryObj } from "@storybook/react";
import { TrendIndicator } from "../../components/analytics/trend-indicator";

const meta: Meta<typeof TrendIndicator> = {
  title: "ANALYTICS/TrendIndicator",
  component: TrendIndicator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TrendIndicator>;

export const Default: Story = {
  args: {},
};
