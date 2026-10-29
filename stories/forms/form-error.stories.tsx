import type { Meta, StoryObj } from "@storybook/react";
import { FormError } from "../../components/forms/form-error";

const meta: Meta<typeof FormError> = {
  title: "FORMS/FormError",
  component: FormError,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormError>;

export const Default: Story = {
  args: {},
};
