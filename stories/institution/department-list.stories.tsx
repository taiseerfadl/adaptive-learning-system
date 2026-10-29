import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentList } from "../../components/institution/department-list";

const meta: Meta<typeof DepartmentList> = {
  title: "INSTITUTION/DepartmentList",
  component: DepartmentList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DepartmentList>;

export const Default: Story = {
  args: {},
};
