import type { Meta, StoryObj } from "@storybook/react";
import { Topbar } from "../../components/layout/topbar";

const meta: Meta<typeof Topbar> = {
  title: "LAYOUT/Topbar",
  component: Topbar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {
  args: {},
};
