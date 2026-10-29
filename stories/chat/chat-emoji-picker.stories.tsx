import type { Meta, StoryObj } from "@storybook/react";
import { ChatEmojiPicker } from "../../components/chat/chat-emoji-picker";

const meta: Meta<typeof ChatEmojiPicker> = {
  title: "CHAT/ChatEmojiPicker",
  component: ChatEmojiPicker,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatEmojiPicker>;

export const Default: Story = {
  args: {},
};
