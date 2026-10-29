import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "../../components/analytics/pie-chart";

const meta: Meta<typeof PieChart> = {
  title: "ANALYTICS/PieChart",
  component: PieChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Default: Story = {
  args: {},
};
