import type { Meta, StoryObj } from "@storybook/react";
import { NotificationItem } from "../../components/notifications/notification-item";

const meta: Meta<typeof NotificationItem> = {
  title: "NOTIFICATIONS/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Default: Story = {
  args: {},
};
