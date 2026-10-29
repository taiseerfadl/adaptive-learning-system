import type { Meta, StoryObj } from "@storybook/react";
import { LiveQualityMonitor } from "../../components/live/live-quality-monitor";

const meta: Meta<typeof LiveQualityMonitor> = {
  title: "LIVE/LiveQualityMonitor",
  component: LiveQualityMonitor,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveQualityMonitor>;

export const Default: Story = {
  args: {},
};
