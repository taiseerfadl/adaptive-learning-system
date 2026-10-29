import type { Meta, StoryObj } from "@storybook/react";
import { ChatAttachment } from "../../components/chat/chat-attachment";

const meta: Meta<typeof ChatAttachment> = {
  title: "CHAT/ChatAttachment",
  component: ChatAttachment,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatAttachment>;

export const Default: Story = {
  args: {},
};
