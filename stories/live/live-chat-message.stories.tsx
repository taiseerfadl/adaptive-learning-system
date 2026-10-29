import type { Meta, StoryObj } from "@storybook/react";
import { LiveChatMessage } from "../../components/live/live-chat-message";

const meta: Meta<typeof LiveChatMessage> = {
  title: "LIVE/LiveChatMessage",
  component: LiveChatMessage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveChatMessage>;

export const Default: Story = {
  args: {},
};
