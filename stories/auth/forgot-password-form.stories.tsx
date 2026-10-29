import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPasswordForm } from "../../components/auth/forgot-password-form";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "AUTH/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

export const Default: Story = {
  args: {},
};
