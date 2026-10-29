import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementCreator } from "../../components/admin/announcement-creator";

const meta: Meta<typeof AnnouncementCreator> = {
  title: "ADMIN/AnnouncementCreator",
  component: AnnouncementCreator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnnouncementCreator>;

export const Default: Story = {
  args: {},
};
