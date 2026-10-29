import type { Meta, StoryObj } from "@storybook/react";
import { LiveRecordingIndicator } from "../../components/live/live-recording-indicator";

const meta: Meta<typeof LiveRecordingIndicator> = {
  title: "LIVE/LiveRecordingIndicator",
  component: LiveRecordingIndicator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveRecordingIndicator>;

export const Default: Story = {
  args: {},
};
