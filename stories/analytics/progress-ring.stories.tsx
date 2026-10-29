import type { Meta, StoryObj } from "@storybook/react";
import { ProgressRing } from "../../components/analytics/progress-ring";

const meta: Meta<typeof ProgressRing> = {
  title: "ANALYTICS/ProgressRing",
  component: ProgressRing,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {
  args: {},
};
