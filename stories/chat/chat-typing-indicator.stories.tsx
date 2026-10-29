import type { Meta, StoryObj } from "@storybook/react";
import { ChatTypingIndicator } from "../../components/chat/chat-typing-indicator";

const meta: Meta<typeof ChatTypingIndicator> = {
  title: "CHAT/ChatTypingIndicator",
  component: ChatTypingIndicator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatTypingIndicator>;

export const Default: Story = {
  args: {},
};
