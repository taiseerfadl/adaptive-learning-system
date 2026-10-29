import type { Meta, StoryObj } from "@storybook/react";
import { CreateLiveSession } from "../../components/live/create-live-session";

const meta: Meta<typeof CreateLiveSession> = {
  title: "LIVE/CreateLiveSession",
  component: CreateLiveSession,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CreateLiveSession>;

export const Default: Story = {
  args: {},
};
