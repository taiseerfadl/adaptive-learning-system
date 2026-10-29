import type { Meta, StoryObj } from "@storybook/react";
import { LiveSessionList } from "../../components/live/live-session-list";

const meta: Meta<typeof LiveSessionList> = {
  title: "LIVE/LiveSessionList",
  component: LiveSessionList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveSessionList>;

export const Default: Story = {
  args: {},
};
