import type { SortStep } from "./types";

export function generateSelectionSortSteps(
  input: number[]
): SortStep[] {
  const array = [...input];
  const steps: SortStep[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        array: [...array],
        comparing: [minIndex, j],
        swapped: false,
        sorted: Array.from(
          { length: i },
          (_, index) => index
        ),
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [
        array[minIndex],
        array[i],
      ];

      steps.push({
        array: [...array],
        comparing: [i, minIndex],
        swapped: true,
        sorted: Array.from(
          { length: i },
          (_, index) => index
        ),
      });
    }

    steps.push({
      array: [...array],
      comparing: [],
      swapped: false,
      sorted: Array.from(
        { length: i + 1 },
        (_, index) => index
      ),
    });
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapped: false,
    sorted: Array.from(
      { length: array.length },
      (_, index) => index
    ),
  });

  return steps;
}