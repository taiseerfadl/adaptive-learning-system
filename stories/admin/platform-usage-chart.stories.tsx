import type { Meta, StoryObj } from "@storybook/react";
import { PlatformUsageChart } from "../../components/admin/platform-usage-chart";

const meta: Meta<typeof PlatformUsageChart> = {
  title: "ADMIN/PlatformUsageChart",
  component: PlatformUsageChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlatformUsageChart>;

export const Default: Story = {
  args: {},
};
