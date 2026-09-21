import { useEffect, useState } from "react";
import "./App.css";
import { generateBubbleSortSteps } from "./bubbleSort";

function App() {
  const initialArray = [5, 3, 8, 4, 2];

  const [steps] = useState(() =>
    generateBubbleSortSteps(initialArray)
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep];

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((previousStep) => previousStep + 1);
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
      <h1>Bubble Sort Visualizer</h1>

      <div className="bars">
        {step.array.map((value, index) => (
          <div className="bar-container" key={index}>
            <div
              className={`bar ${
                step.sorted.includes(index)
                  ? "sorted"
                  : step.swapped && step.comparing.includes(index)
                    ? "swapped"
                    : step.comparing.includes(index)
                      ? "comparing"
                      : ""
              }`}
              style={{ height: `${value * 40}px` }}
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

        <button onClick={handleNextStep} disabled={isPlaying}>
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