import type { Meta, StoryObj } from "@storybook/react";
import { OtpInput } from "../../components/forms/otp-input";

const meta: Meta<typeof OtpInput> = {
  title: "FORMS/OtpInput",
  component: OtpInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
  args: {},
};
