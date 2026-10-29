import type { Meta, StoryObj } from "@storybook/react";
import { LiveParticipants } from "../../components/live/live-participants";

const meta: Meta<typeof LiveParticipants> = {
  title: "LIVE/LiveParticipants",
  component: LiveParticipants,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveParticipants>;

export const Default: Story = {
  args: {},
};
