import type { Meta, StoryObj } from "@storybook/react";
import { ChatPinned } from "../../components/chat/chat-pinned";

const meta: Meta<typeof ChatPinned> = {
  title: "CHAT/ChatPinned",
  component: ChatPinned,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatPinned>;

export const Default: Story = {
  args: {},
};
