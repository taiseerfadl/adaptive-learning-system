import type { Meta, StoryObj } from "@storybook/react";
import { FormSuccess } from "../../components/forms/form-success";

const meta: Meta<typeof FormSuccess> = {
  title: "FORMS/FormSuccess",
  component: FormSuccess,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormSuccess>;

export const Default: Story = {
  args: {},
};
