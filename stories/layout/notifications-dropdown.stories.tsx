import type { Meta, StoryObj } from "@storybook/react";
import { NotificationsDropdown } from "../../components/layout/notifications-dropdown";

const meta: Meta<typeof NotificationsDropdown> = {
  title: "LAYOUT/NotificationsDropdown",
  component: NotificationsDropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationsDropdown>;

export const Default: Story = {
  args: {},
};
