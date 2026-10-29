import type { Meta, StoryObj } from "@storybook/react";
import { ChatFilePreview } from "../../components/chat/chat-file-preview";

const meta: Meta<typeof ChatFilePreview> = {
  title: "CHAT/ChatFilePreview",
  component: ChatFilePreview,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatFilePreview>;

export const Default: Story = {
  args: {},
};
