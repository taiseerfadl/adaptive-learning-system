import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessageGroup } from "../../components/chat/chat-message-group";

const meta: Meta<typeof ChatMessageGroup> = {
  title: "CHAT/ChatMessageGroup",
  component: ChatMessageGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatMessageGroup>;

export const Default: Story = {
  args: {},
};
