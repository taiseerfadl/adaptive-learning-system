import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementList } from "../../components/admin/announcement-list";

const meta: Meta<typeof AnnouncementList> = {
  title: "ADMIN/AnnouncementList",
  component: AnnouncementList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnnouncementList>;

export const Default: Story = {
  args: {},
};
