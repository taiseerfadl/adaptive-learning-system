import type { Meta, StoryObj } from "@storybook/react";
import { ChatSidebar } from "../../components/chat/chat-sidebar";

const meta: Meta<typeof ChatSidebar> = {
  title: "CHAT/ChatSidebar",
  component: ChatSidebar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatSidebar>;

export const Default: Story = {
  args: {},
};
