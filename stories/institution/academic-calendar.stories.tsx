import type { Meta, StoryObj } from "@storybook/react";
import { AcademicCalendar } from "../../components/institution/academic-calendar";

const meta: Meta<typeof AcademicCalendar> = {
  title: "INSTITUTION/AcademicCalendar",
  component: AcademicCalendar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AcademicCalendar>;

export const Default: Story = {
  args: {},
};
