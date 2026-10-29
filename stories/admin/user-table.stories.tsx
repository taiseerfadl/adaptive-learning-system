import type { Meta, StoryObj } from "@storybook/react";
import { UserTable } from "../../components/admin/user-table";

const meta: Meta<typeof UserTable> = {
  title: "ADMIN/UserTable",
  component: UserTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserTable>;

export const Default: Story = {
  args: {},
};
