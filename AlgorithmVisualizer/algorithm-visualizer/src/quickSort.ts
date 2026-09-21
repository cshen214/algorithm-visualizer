import type { SortStep } from "./types";

export function generateQuickSortSteps(
  input: number[]
): SortStep[] {
  const array = [...input];
  const steps: SortStep[] = [];

  function quickSort(
    low: number,
    high: number
  ): void {
    if (low >= high) {
      return;
    }

    const pivotIndex = partition(low, high);

    quickSort(low, pivotIndex - 1);
    quickSort(pivotIndex + 1, high);
  }

  function partition(
    low: number,
    high: number
  ): number {
    const pivot = array[high];
    let i = low;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        comparing: [j, high],
        swapped: false,
        sorted: [],
      });

      if (array[j] < pivot) {
        if (i !== j) {
          [array[i], array[j]] = [
            array[j],
            array[i],
          ];

          steps.push({
            array: [...array],
            comparing: [i, j],
            swapped: true,
            sorted: [],
          });
        }

        i++;
      }
    }

    if (i !== high) {
      [array[i], array[high]] = [
        array[high],
        array[i],
      ];

      steps.push({
        array: [...array],
        comparing: [i, high],
        swapped: true,
        sorted: [],
      });
    }

    steps.push({
      array: [...array],
      comparing: [],
      swapped: false,
      sorted: [i],
    });

    return i;
  }

  if (array.length > 1) {
    quickSort(0, array.length - 1);
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