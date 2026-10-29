import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "../../components/layout/breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "LAYOUT/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {},
};
