import type { Meta, StoryObj } from "@storybook/react";
import { FileDropzone } from "../../components/forms/file-dropzone";

const meta: Meta<typeof FileDropzone> = {
  title: "FORMS/FileDropzone",
  component: FileDropzone,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileDropzone>;

export const Default: Story = {
  args: {},
};
