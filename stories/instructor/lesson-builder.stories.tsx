import type { Meta, StoryObj } from "@storybook/react";
import { LessonBuilder } from "../../components/instructor/lesson-builder";

const meta: Meta<typeof LessonBuilder> = {
  title: "INSTRUCTOR/LessonBuilder",
  component: LessonBuilder,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LessonBuilder>;

export const Default: Story = {
  args: {},
};
