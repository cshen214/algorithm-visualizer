import { useEffect, useState } from "react";
import "./App.css";
import { generateBubbleSortSteps } from "./bubbleSort";
import { generateMergeSortSteps } from "./mergeSort";
import { generateInsertionSortSteps } from "./insertionSort";
import { generateSelectionSortSteps } from "./selectionSort";
import { generateQuickSortSteps } from "./quickSort";

type SortType =
  | "bubble"
  | "merge"
  | "insertion"
  | "selection"
  | "quick";

function App() {
  const initialArray = [5, 3, 8, 4, 2];

  const [sortType, setSortType] =
    useState<SortType>("bubble");

  const [steps, setSteps] = useState(() =>
    generateBubbleSortSteps(initialArray)
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep];

  useEffect(() => {
    if (sortType === "bubble") {
      setSteps(generateBubbleSortSteps(initialArray));
    } else if (sortType === "merge") {
      setSteps(generateMergeSortSteps(initialArray));
    } else if (sortType === "insertion") {
      setSteps(generateInsertionSortSteps(initialArray));
    } else if (sortType === "selection") {
      setSteps(generateSelectionSortSteps(initialArray));
    } else {
      setSteps(generateQuickSortSteps(initialArray));
    }

    setCurrentStep(0);
    setIsPlaying(false);
  }, [sortType]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(
        (previousStep) => previousStep + 1
      );
    }, 700);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length]);

  function handleNextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handlePlayPause() {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  }

  function handleReset() {
    setIsPlaying(false);
    setCurrentStep(0);
  }

  return (
    <div className="app">
      <h1>Sorting Algorithm Visualizer</h1>

      <div className="algorithm-selector">
        <label htmlFor="sort-select">
          Sorting Algorithm:
        </label>

        <select
          id="sort-select"
          value={sortType}
          onChange={(event) =>
            setSortType(
              event.target.value as SortType
            )
          }
        >
          <option value="bubble">
            Bubble Sort
          </option>

          <option value="merge">
            Merge Sort
          </option>

          <option value="insertion">
            Insertion Sort
          </option>

          <option value="selection">
            Selection Sort
          </option>

          <option value="quick">
            Quick Sort
          </option>
        </select>
      </div>

      <div className="bars">
        {step.array.map((value, index) => (
          <div
            className="bar-container"
            key={index}
          >
            <div
              className={`bar ${
                step.sorted.includes(index)
                  ? "sorted"
                  : step.swapped &&
                      step.comparing.includes(index)
                    ? "swapped"
                    : step.comparing.includes(index)
                      ? "comparing"
                      : ""
              }`}
              style={{
                height: `${value * 40}px`,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={handleNextStep}
          disabled={isPlaying}
        >
          Next Step
        </button>

        <button onClick={handleReset}>
          Reset
        </button>
      </div>

      <p>
        Step {currentStep + 1} of {steps.length}
      </p>
    </div>
  );
}

export default App;