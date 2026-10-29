import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "../../components/forms/form-field";

const meta: Meta<typeof FormField> = {
  title: "FORMS/FormField",
  component: FormField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {},
};
