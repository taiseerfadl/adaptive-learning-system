import type { Meta, StoryObj } from "@storybook/react";
import { ChatList } from "../../components/chat/chat-list";

const meta: Meta<typeof ChatList> = {
  title: "CHAT/ChatList",
  component: ChatList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatList>;

export const Default: Story = {
  args: {},
};
