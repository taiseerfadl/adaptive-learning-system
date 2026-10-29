import type { Meta, StoryObj } from "@storybook/react";
import { ChatUserItem } from "../../components/chat/chat-user-item";

const meta: Meta<typeof ChatUserItem> = {
  title: "CHAT/ChatUserItem",
  component: ChatUserItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatUserItem>;

export const Default: Story = {
  args: {},
};
