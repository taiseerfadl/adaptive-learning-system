import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessage } from "../../components/chat/chat-message";

const meta: Meta<typeof ChatMessage> = {
  title: "CHAT/ChatMessage",
  component: ChatMessage,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const Default: Story = {
  args: {},
};
