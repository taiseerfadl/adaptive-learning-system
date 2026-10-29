import type { Meta, StoryObj } from "@storybook/react";
import { LivePoll } from "../../components/live/live-poll";

const meta: Meta<typeof LivePoll> = {
  title: "LIVE/LivePoll",
  component: LivePoll,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LivePoll>;

export const Default: Story = {
  args: {},
};
