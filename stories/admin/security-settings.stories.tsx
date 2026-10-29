import type { Meta, StoryObj } from "@storybook/react";
import { SecuritySettings } from "../../components/admin/security-settings";

const meta: Meta<typeof SecuritySettings> = {
  title: "ADMIN/SecuritySettings",
  component: SecuritySettings,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SecuritySettings>;

export const Default: Story = {
  args: {},
};
