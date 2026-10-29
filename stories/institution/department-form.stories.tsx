import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentForm } from "../../components/institution/department-form";

const meta: Meta<typeof DepartmentForm> = {
  title: "INSTITUTION/DepartmentForm",
  component: DepartmentForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DepartmentForm>;

export const Default: Story = {
  args: {},
};
