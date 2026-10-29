import type { Meta, StoryObj } from "@storybook/react";
import { TimeSpentChart } from "../../components/analytics/time-spent-chart";

const meta: Meta<typeof TimeSpentChart> = {
  title: "ANALYTICS/TimeSpentChart",
  component: TimeSpentChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TimeSpentChart>;

export const Default: Story = {
  args: {},
};
