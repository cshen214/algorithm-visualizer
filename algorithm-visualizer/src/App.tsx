import { useState } from "react";
import "./App.css";
import { generateBubbleSortSteps } from "./bubbleSort";

function App() {
  const initialArray = [5, 3, 8, 4, 2];

  const [steps] = useState(() =>
    generateBubbleSortSteps(initialArray)
  );

  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];

  function handleNextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  return (
    <div className="app">
      <h1>Bubble Sort Visualizer</h1>

      <div className="bars">
        {step.array.map((value, index) => (
          <div className="bar-container" key={index}>
            <div
              className="bar"
              style={{ height: `${value * 40}px` }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleNextStep}>
        Next Step
      </button>

      <p>
        Step {currentStep + 1} of {steps.length}
      </p>
    </div>
  );
}

export default App;