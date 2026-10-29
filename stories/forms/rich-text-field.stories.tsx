import type { Meta, StoryObj } from "@storybook/react";
import { RichTextField } from "../../components/forms/rich-text-field";

const meta: Meta<typeof RichTextField> = {
  title: "FORMS/RichTextField",
  component: RichTextField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RichTextField>;

export const Default: Story = {
  args: {},
};
