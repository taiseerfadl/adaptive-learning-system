import type { Meta, StoryObj } from "@storybook/react";
import { ChatHeader } from "../../components/chat/chat-header";

const meta: Meta<typeof ChatHeader> = {
  title: "CHAT/ChatHeader",
  component: ChatHeader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatHeader>;

export const Default: Story = {
  args: {},
};
