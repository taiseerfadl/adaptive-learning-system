import type { Meta, StoryObj } from "@storybook/react";
import { PushNotification } from "../../components/notifications/push-notification";

const meta: Meta<typeof PushNotification> = {
  title: "NOTIFICATIONS/PushNotification",
  component: PushNotification,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PushNotification>;

export const Default: Story = {
  args: {},
};
