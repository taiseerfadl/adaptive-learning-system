import type { Meta, StoryObj } from "@storybook/react";
import { ChatNewConversation } from "../../components/chat/chat-new-conversation";

const meta: Meta<typeof ChatNewConversation> = {
  title: "CHAT/ChatNewConversation",
  component: ChatNewConversation,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatNewConversation>;

export const Default: Story = {
  args: {},
};
