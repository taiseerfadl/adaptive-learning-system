import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "../../components/analytics/line-chart";

const meta: Meta<typeof LineChart> = {
  title: "ANALYTICS/LineChart",
  component: LineChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {},
};
