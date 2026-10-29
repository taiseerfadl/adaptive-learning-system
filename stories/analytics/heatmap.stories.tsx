import type { Meta, StoryObj } from "@storybook/react";
import { Heatmap } from "../../components/analytics/heatmap";

const meta: Meta<typeof Heatmap> = {
  title: "ANALYTICS/Heatmap",
  component: Heatmap,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Heatmap>;

export const Default: Story = {
  args: {},
};
