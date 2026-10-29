import type { Meta, StoryObj } from "@storybook/react";
import { ChatDelete } from "../../components/chat/chat-delete";

const meta: Meta<typeof ChatDelete> = {
  title: "CHAT/ChatDelete",
  component: ChatDelete,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatDelete>;

export const Default: Story = {
  args: {},
};
