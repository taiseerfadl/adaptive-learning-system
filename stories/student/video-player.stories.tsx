import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "../../components/student/video-player";

const meta: Meta<typeof VideoPlayer> = {
  title: "STUDENT/VideoPlayer",
  component: VideoPlayer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {},
};
