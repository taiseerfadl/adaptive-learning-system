import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "../../components/layout/navbar";

const meta: Meta<typeof Navbar> = {
  title: "LAYOUT/Navbar",
  component: Navbar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};
