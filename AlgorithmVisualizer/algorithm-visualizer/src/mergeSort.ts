import type { SortStep } from "./types";

export function generateMergeSortSteps(
  input: number[]
): SortStep[] {
  const array = [...input];
  const steps: SortStep[] = [];

  function mergeSort(
    start: number,
    end: number
  ): void {
    if (start >= end) {
      return;
    }

    const middle = Math.floor((start + end) / 2);

    mergeSort(start, middle);
    mergeSort(middle + 1, end);

    merge(start, middle, end);
  }

  function merge(
    start: number,
    middle: number,
    end: number
  ): void {
    const left = array.slice(start, middle + 1);
    const right = array.slice(middle + 1, end + 1);

    let leftIndex = 0;
    let rightIndex = 0;
    let arrayIndex = start;

    while (
      leftIndex < left.length &&
      rightIndex < right.length
    ) {
      const currentLeftIndex = start + leftIndex;
      const currentRightIndex = middle + 1 + rightIndex;

      steps.push({
        array: [...array],
        comparing: [
          currentLeftIndex,
          currentRightIndex,
        ],
        swapped: false,
        sorted: [],
      });

      if (left[leftIndex] <= right[rightIndex]) {
        array[arrayIndex] = left[leftIndex];
        leftIndex++;
      } else {
        array[arrayIndex] = right[rightIndex];
        rightIndex++;
      }

      steps.push({
        array: [...array],
        comparing: [
          currentLeftIndex,
          currentRightIndex,
        ],
        swapped: false,
        sorted: [],
      });

      arrayIndex++;
    }

    while (leftIndex < left.length) {
      array[arrayIndex] = left[leftIndex];

      steps.push({
        array: [...array],
        comparing: [],
        swapped: false,
        sorted: [],
      });

      leftIndex++;
      arrayIndex++;
    }

    while (rightIndex < right.length) {
      array[arrayIndex] = right[rightIndex];

      steps.push({
        array: [...array],
        comparing: [],
        swapped: false,
        sorted: [],
      });

      rightIndex++;
      arrayIndex++;
    }
  }

  if (array.length > 1) {
    mergeSort(0, array.length - 1);
  }

  // Final state: everything is sorted
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