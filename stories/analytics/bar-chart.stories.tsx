import type { Meta, StoryObj } from "@storybook/react";
import { BarChart } from "../../components/analytics/bar-chart";

const meta: Meta<typeof BarChart> = {
  title: "ANALYTICS/BarChart",
  component: BarChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {},
};
