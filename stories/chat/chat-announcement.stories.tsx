import type { Meta, StoryObj } from "@storybook/react";
import { ChatAnnouncement } from "../../components/chat/chat-announcement";

const meta: Meta<typeof ChatAnnouncement> = {
  title: "CHAT/ChatAnnouncement",
  component: ChatAnnouncement,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatAnnouncement>;

export const Default: Story = {
  args: {},
};
