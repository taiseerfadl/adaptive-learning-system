import type { Meta, StoryObj } from "@storybook/react";
import { SidebarItem } from "../../components/layout/sidebar-item";

const meta: Meta<typeof SidebarItem> = {
  title: "LAYOUT/SidebarItem",
  component: SidebarItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  args: {},
};
