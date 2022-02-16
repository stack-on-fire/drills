import { Drill, DrillHint, DrillTestCase } from "@prisma/client";

export type DrillWithHintsAndTestCases = Drill & {
  hints: ReadonlyArray<DrillHint>;
  testCases: ReadonlyArray<DrillTestCase>;
};
