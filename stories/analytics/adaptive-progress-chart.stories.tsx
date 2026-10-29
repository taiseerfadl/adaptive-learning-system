import type { Meta, StoryObj } from "@storybook/react";
import { AdaptiveProgressChart } from "../../components/analytics/adaptive-progress-chart";

const meta: Meta<typeof AdaptiveProgressChart> = {
  title: "ANALYTICS/AdaptiveProgressChart",
  component: AdaptiveProgressChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AdaptiveProgressChart>;

export const Default: Story = {
  args: {},
};
