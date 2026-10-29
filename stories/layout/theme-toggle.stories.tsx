import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "../../components/layout/theme-toggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "LAYOUT/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {},
};
