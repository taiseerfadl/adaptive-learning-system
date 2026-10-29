import type { Meta, StoryObj } from "@storybook/react";
import { DragDropLesson } from "../../components/instructor/drag-drop-lesson";

const meta: Meta<typeof DragDropLesson> = {
  title: "INSTRUCTOR/DragDropLesson",
  component: DragDropLesson,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DragDropLesson>;

export const Default: Story = {
  args: {},
};
