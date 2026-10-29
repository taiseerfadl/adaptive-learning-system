import type { Meta, StoryObj } from "@storybook/react";
import { SystemSettingsForm } from "../../components/admin/system-settings-form";

const meta: Meta<typeof SystemSettingsForm> = {
  title: "ADMIN/SystemSettingsForm",
  component: SystemSettingsForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SystemSettingsForm>;

export const Default: Story = {
  args: {},
};
