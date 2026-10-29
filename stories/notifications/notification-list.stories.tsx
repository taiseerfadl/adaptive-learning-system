import type { Meta, StoryObj } from "@storybook/react";
import { NotificationList } from "../../components/notifications/notification-list";

const meta: Meta<typeof NotificationList> = {
  title: "NOTIFICATIONS/NotificationList",
  component: NotificationList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Default: Story = {
  args: {},
};
