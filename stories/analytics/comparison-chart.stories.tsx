import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonChart } from "../../components/analytics/comparison-chart";

const meta: Meta<typeof ComparisonChart> = {
  title: "ANALYTICS/ComparisonChart",
  component: ComparisonChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComparisonChart>;

export const Default: Story = {
  args: {},
};
