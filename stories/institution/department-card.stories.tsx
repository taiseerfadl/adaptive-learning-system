import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentCard } from "../../components/institution/department-card";

const meta: Meta<typeof DepartmentCard> = {
  title: "INSTITUTION/DepartmentCard",
  component: DepartmentCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DepartmentCard>;

export const Default: Story = {
  args: {},
};
