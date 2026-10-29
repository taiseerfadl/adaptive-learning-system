import type { Meta, StoryObj } from "@storybook/react";
import { LiveChat } from "../../components/live/live-chat";

const meta: Meta<typeof LiveChat> = {
  title: "LIVE/LiveChat",
  component: LiveChat,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveChat>;

export const Default: Story = {
  args: {},
};
