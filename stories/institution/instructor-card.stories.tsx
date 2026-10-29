import type { Meta, StoryObj } from "@storybook/react";
import { InstructorCard } from "../../components/institution/instructor-card";

const meta: Meta<typeof InstructorCard> = {
  title: "INSTITUTION/InstructorCard",
  component: InstructorCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstructorCard>;

export const Default: Story = {
  args: {},
};
