import type { Meta, StoryObj } from "@storybook/react";
import { UserNav } from "../../components/layout/user-nav";

const meta: Meta<typeof UserNav> = {
  title: "LAYOUT/UserNav",
  component: UserNav,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserNav>;

export const Default: Story = {
  args: {},
};
