import type { Meta, StoryObj } from "@storybook/react";
import { ImageUpload } from "../../components/forms/image-upload";

const meta: Meta<typeof ImageUpload> = {
  title: "FORMS/ImageUpload",
  component: ImageUpload,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {
  args: {},
};
