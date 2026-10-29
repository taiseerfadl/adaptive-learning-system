import type { Meta, StoryObj } from "@storybook/react";
import { ResetPasswordForm } from "../../components/auth/reset-password-form";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "AUTH/ResetPasswordForm",
  component: ResetPasswordForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {
  args: {},
};
