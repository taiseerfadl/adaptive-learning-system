import type { Meta, StoryObj } from "@storybook/react";
import { JoinLiveSession } from "../../components/live/join-live-session";

const meta: Meta<typeof JoinLiveSession> = {
  title: "LIVE/JoinLiveSession",
  component: JoinLiveSession,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof JoinLiveSession>;

export const Default: Story = {
  args: {},
};
