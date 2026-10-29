import type { Meta, StoryObj } from "@storybook/react";
import { LiveRaiseHand } from "../../components/live/live-raise-hand";

const meta: Meta<typeof LiveRaiseHand> = {
  title: "LIVE/LiveRaiseHand",
  component: LiveRaiseHand,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveRaiseHand>;

export const Default: Story = {
  args: {},
};
