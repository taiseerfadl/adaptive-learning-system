import type { Meta, StoryObj } from "@storybook/react";
import { ChatSearch } from "../../components/chat/chat-search";

const meta: Meta<typeof ChatSearch> = {
  title: "CHAT/ChatSearch",
  component: ChatSearch,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatSearch>;

export const Default: Story = {
  args: {},
};
