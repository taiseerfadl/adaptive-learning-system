import type { Meta, StoryObj } from "@storybook/react";
import { ChatRoom } from "../../components/chat/chat-room";

const meta: Meta<typeof ChatRoom> = {
  title: "CHAT/ChatRoom",
  component: ChatRoom,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatRoom>;

export const Default: Story = {
  args: {},
};
