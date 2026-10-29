import type { Meta, StoryObj } from "@storybook/react";
import { RoleCard } from "../../components/admin/role-card";

const meta: Meta<typeof RoleCard> = {
  title: "ADMIN/RoleCard",
  component: RoleCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RoleCard>;

export const Default: Story = {
  args: {},
};
