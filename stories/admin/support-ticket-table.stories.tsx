import type { Meta, StoryObj } from "@storybook/react";
import { SupportTicketTable } from "../../components/admin/support-ticket-table";

const meta: Meta<typeof SupportTicketTable> = {
  title: "ADMIN/SupportTicketTable",
  component: SupportTicketTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SupportTicketTable>;

export const Default: Story = {
  args: {},
};
