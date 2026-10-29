import type { Meta, StoryObj } from "@storybook/react";
import { LivePlayer } from "../../components/live/live-player";

const meta: Meta<typeof LivePlayer> = {
  title: "LIVE/LivePlayer",
  component: LivePlayer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LivePlayer>;

export const Default: Story = {
  args: {},
};
