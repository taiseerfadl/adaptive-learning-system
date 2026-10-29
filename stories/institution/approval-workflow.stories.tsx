import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalWorkflow } from "../../components/institution/approval-workflow";

const meta: Meta<typeof ApprovalWorkflow> = {
  title: "INSTITUTION/ApprovalWorkflow",
  component: ApprovalWorkflow,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ApprovalWorkflow>;

export const Default: Story = {
  args: {},
};
