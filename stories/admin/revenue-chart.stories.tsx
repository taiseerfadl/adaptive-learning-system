import type { Meta, StoryObj } from "@storybook/react";
import { RevenueChart } from "../../components/admin/revenue-chart";

const meta: Meta<typeof RevenueChart> = {
  title: "ADMIN/RevenueChart",
  component: RevenueChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RevenueChart>;

export const Default: Story = {
  args: {},
};
