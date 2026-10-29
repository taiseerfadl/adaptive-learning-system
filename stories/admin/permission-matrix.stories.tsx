import type { Meta, StoryObj } from "@storybook/react";
import { PermissionMatrix } from "../../components/admin/permission-matrix";

const meta: Meta<typeof PermissionMatrix> = {
  title: "ADMIN/PermissionMatrix",
  component: PermissionMatrix,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PermissionMatrix>;

export const Default: Story = {
  args: {},
};
