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
        sorted: Array.from(
          { length: i },
          (_, index) => array.length - 1 - index
        ),
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [
          array[j + 1],
          array[j],
        ];

        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapped: true,
          sorted: Array.from(
            { length: i },
            (_, index) => array.length - 1 - index
          ),
        });
      }
    }

    // The largest remaining number is now locked
    steps.push({
      array: [...array],
      comparing: [],
      swapped: false,
      sorted: Array.from(
        { length: i + 1 },
        (_, index) => array.length - 1 - index
      ),
    });
  }

  return steps;
}