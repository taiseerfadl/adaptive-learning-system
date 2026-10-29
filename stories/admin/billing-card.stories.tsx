import type { Meta, StoryObj } from "@storybook/react";
import { BillingCard } from "../../components/admin/billing-card";

const meta: Meta<typeof BillingCard> = {
  title: "ADMIN/BillingCard",
  component: BillingCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BillingCard>;

export const Default: Story = {
  args: {},
};
