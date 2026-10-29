import type { Meta, StoryObj } from "@storybook/react";
import { VerifyEmailForm } from "../../components/auth/verify-email-form";

const meta: Meta<typeof VerifyEmailForm> = {
  title: "AUTH/VerifyEmailForm",
  component: VerifyEmailForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof VerifyEmailForm>;

export const Default: Story = {
  args: {},
};
