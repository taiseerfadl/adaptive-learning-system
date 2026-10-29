import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "../../components/forms/tag-input";

const meta: Meta<typeof TagInput> = {
  title: "FORMS/TagInput",
  component: TagInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  args: {},
};
