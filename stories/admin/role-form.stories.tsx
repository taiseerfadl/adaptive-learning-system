import type { Meta, StoryObj } from "@storybook/react";
import { RoleForm } from "../../components/admin/role-form";

const meta: Meta<typeof RoleForm> = {
  title: "ADMIN/RoleForm",
  component: RoleForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RoleForm>;

export const Default: Story = {
  args: {},
};
