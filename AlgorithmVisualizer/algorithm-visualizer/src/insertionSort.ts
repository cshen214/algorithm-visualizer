import type { SortStep } from "./types";

export function generateInsertionSortSteps(
  input: number[]
): SortStep[] {
  const array = [...input];
  const steps: SortStep[] = [];

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      comparing: [i],
      swapped: false,
      sorted: Array.from({ length: i }, (_, index) => index),
    });

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapped: false,
        sorted: Array.from({ length: i }, (_, index) => index),
      });

      array[j + 1] = array[j];

      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapped: true,
        sorted: Array.from({ length: i }, (_, index) => index),
      });

      j--;
    }

    array[j + 1] = key;

    steps.push({
      array: [...array],
      comparing: [j + 1],
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