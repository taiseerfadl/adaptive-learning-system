import type { Meta, StoryObj } from "@storybook/react";
import { ToastNotification } from "../../components/notifications/toast-notification";

const meta: Meta<typeof ToastNotification> = {
  title: "NOTIFICATIONS/ToastNotification",
  component: ToastNotification,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToastNotification>;

export const Default: Story = {
  args: {},
};
