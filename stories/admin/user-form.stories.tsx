import type { Meta, StoryObj } from "@storybook/react";
import { UserForm } from "../../components/admin/user-form";

const meta: Meta<typeof UserForm> = {
  title: "ADMIN/UserForm",
  component: UserForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserForm>;

export const Default: Story = {
  args: {},
};
