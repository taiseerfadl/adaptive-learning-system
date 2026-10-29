import type { Meta, StoryObj } from "@storybook/react";
import { PlanManager } from "../../components/admin/plan-manager";

const meta: Meta<typeof PlanManager> = {
  title: "ADMIN/PlanManager",
  component: PlanManager,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanManager>;

export const Default: Story = {
  args: {},
};
