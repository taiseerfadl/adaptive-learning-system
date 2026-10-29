import type { Meta, StoryObj } from "@storybook/react";
import { FormWrapper } from "../../components/forms/form-wrapper";

const meta: Meta<typeof FormWrapper> = {
  title: "FORMS/FormWrapper",
  component: FormWrapper,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormWrapper>;

export const Default: Story = {
  args: {},
};
