import type { Meta, StoryObj } from "@storybook/react";
import { MobileNav } from "../../components/layout/mobile-nav";

const meta: Meta<typeof MobileNav> = {
  title: "LAYOUT/MobileNav",
  component: MobileNav,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MobileNav>;

export const Default: Story = {
  args: {},
};
