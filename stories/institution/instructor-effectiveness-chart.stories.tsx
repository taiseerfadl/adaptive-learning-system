import type { Meta, StoryObj } from "@storybook/react";
import { InstructorEffectivenessChart } from "../../components/institution/instructor-effectiveness-chart";

const meta: Meta<typeof InstructorEffectivenessChart> = {
  title: "INSTITUTION/InstructorEffectivenessChart",
  component: InstructorEffectivenessChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstructorEffectivenessChart>;

export const Default: Story = {
  args: {},
};
