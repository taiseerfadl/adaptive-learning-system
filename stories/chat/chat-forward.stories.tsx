import type { Meta, StoryObj } from "@storybook/react";
import { ChatForward } from "../../components/chat/chat-forward";

const meta: Meta<typeof ChatForward> = {
  title: "CHAT/ChatForward",
  component: ChatForward,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatForward>;

export const Default: Story = {
  args: {},
};
