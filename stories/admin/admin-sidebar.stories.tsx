import type { Meta, StoryObj } from "@storybook/react";
import { AdminSidebar } from "../../components/admin/admin-sidebar";

const meta: Meta<typeof AdminSidebar> = {
  title: "ADMIN/AdminSidebar",
  component: AdminSidebar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AdminSidebar>;

export const Default: Story = {
  args: {},
};
