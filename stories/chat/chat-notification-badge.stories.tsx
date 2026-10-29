import type { Meta, StoryObj } from "@storybook/react";
import { ChatNotificationBadge } from "../../components/chat/chat-notification-badge";

const meta: Meta<typeof ChatNotificationBadge> = {
  title: "CHAT/ChatNotificationBadge",
  component: ChatNotificationBadge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatNotificationBadge>;

export const Default: Story = {
  args: {},
};
