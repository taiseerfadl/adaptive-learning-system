import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "../../components/auth/login-form";

const meta: Meta<typeof LoginForm> = {
  title: "AUTH/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};
