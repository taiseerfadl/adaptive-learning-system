import type { Meta, StoryObj } from "@storybook/react";
import { EnrollmentChart } from "../../components/instructor/enrollment-chart";

const meta: Meta<typeof EnrollmentChart> = {
  title: "INSTRUCTOR/EnrollmentChart",
  component: EnrollmentChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EnrollmentChart>;

export const Default: Story = {
  args: {},
};
