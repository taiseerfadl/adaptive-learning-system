import type { Meta, StoryObj } from "@storybook/react";
import { LiveCountdown } from "../../components/live/live-countdown";

const meta: Meta<typeof LiveCountdown> = {
  title: "LIVE/LiveCountdown",
  component: LiveCountdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveCountdown>;

export const Default: Story = {
  args: {},
};
