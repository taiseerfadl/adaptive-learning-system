import type { Meta, StoryObj } from "@storybook/react";
import { LiveScreenShare } from "../../components/live/live-screen-share";

const meta: Meta<typeof LiveScreenShare> = {
  title: "LIVE/LiveScreenShare",
  component: LiveScreenShare,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveScreenShare>;

export const Default: Story = {
  args: {},
};
