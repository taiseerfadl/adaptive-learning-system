import type { Meta, StoryObj } from "@storybook/react";
import { ChatOnlineStatus } from "../../components/chat/chat-online-status";

const meta: Meta<typeof ChatOnlineStatus> = {
  title: "CHAT/ChatOnlineStatus",
  component: ChatOnlineStatus,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatOnlineStatus>;

export const Default: Story = {
  args: {},
};
