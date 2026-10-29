import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "../../components/analytics/radar-chart";

const meta: Meta<typeof RadarChart> = {
  title: "ANALYTICS/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

export const Default: Story = {
  args: {},
};
