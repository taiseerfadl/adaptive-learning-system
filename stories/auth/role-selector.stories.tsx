import type { Meta, StoryObj } from "@storybook/react";
import { RoleSelector } from "../../components/auth/role-selector";

const meta: Meta<typeof RoleSelector> = {
  title: "AUTH/RoleSelector",
  component: RoleSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RoleSelector>;

export const Default: Story = {
  args: {},
};
