import type { Meta, StoryObj } from "@storybook/react";
import { AuditLogTable } from "../../components/admin/audit-log-table";

const meta: Meta<typeof AuditLogTable> = {
  title: "ADMIN/AuditLogTable",
  component: AuditLogTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AuditLogTable>;

export const Default: Story = {
  args: {},
};
