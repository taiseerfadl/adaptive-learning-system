import type { Meta, StoryObj } from "@storybook/react";
import { StudentEnrollmentTable } from "../../components/institution/student-enrollment-table";

const meta: Meta<typeof StudentEnrollmentTable> = {
  title: "INSTITUTION/StudentEnrollmentTable",
  component: StudentEnrollmentTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StudentEnrollmentTable>;

export const Default: Story = {
  args: {},
};
