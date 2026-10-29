import type { Meta, StoryObj } from "@storybook/react";
import { NotificationBadge } from "../../components/notifications/notification-badge";

const meta: Meta<typeof NotificationBadge> = {
  title: "NOTIFICATIONS/NotificationBadge",
  component: NotificationBadge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationBadge>;

export const Default: Story = {
  args: {},
};
