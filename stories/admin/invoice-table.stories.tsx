import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceTable } from "../../components/admin/invoice-table";

const meta: Meta<typeof InvoiceTable> = {
  title: "ADMIN/InvoiceTable",
  component: InvoiceTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InvoiceTable>;

export const Default: Story = {
  args: {},
};
