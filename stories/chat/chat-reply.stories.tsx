import type { Meta, StoryObj } from "@storybook/react";
import { ChatReply } from "../../components/chat/chat-reply";

const meta: Meta<typeof ChatReply> = {
  title: "CHAT/ChatReply",
  component: ChatReply,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatReply>;

export const Default: Story = {
  args: {},
};
