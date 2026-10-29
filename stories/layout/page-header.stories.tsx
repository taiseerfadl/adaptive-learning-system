import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../../components/layout/page-header";

const meta: Meta<typeof PageHeader> = {
  title: "LAYOUT/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {},
};
