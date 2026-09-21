import type { SortStep } from "./types";

export function generateBubbleSortSteps(
  input: number[]
): SortStep[] {
  const array = [...input];
  const steps: SortStep[] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapped: false,
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] =
          [array[j + 1], array[j]];

        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapped: true,
        });
      }
    }
  }

  return steps;
}