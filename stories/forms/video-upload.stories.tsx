import type { Meta, StoryObj } from "@storybook/react";
import { VideoUpload } from "../../components/forms/video-upload";

const meta: Meta<typeof VideoUpload> = {
  title: "FORMS/VideoUpload",
  component: VideoUpload,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof VideoUpload>;

export const Default: Story = {
  args: {},
};
