import React, { useState } from 'react';

const Calculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [weightCategory, setWeightCategory] = useState('');

  const calculateBMI = () => {
    // Convert weight and height to numbers
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Check if weight and height are valid numbers
    if (isNaN(weightNum) || isNaN(heightNum)) {
      // Handle invalid input
      setBmi('Invalid input');
      setWeightCategory('');
      return;
    }

    // Convert height to meters
    const heightInMeters = heightNum / 100;

    // Calculate the BMI
    const bmiValue = weightNum / (heightInMeters * heightInMeters);

    // Determine the weight category based on the BMI value
    let category = '';
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    // Update the state with the calculated BMI and weight category
    setBmi(bmiValue.toFixed(2)); // Round to 2 decimal places
    setWeightCategory(category);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 h-96 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            className="border border-gray-300 rounded-md p-2 mb-2"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="number"
            placeholder="Height (m)"
            className="border border-gray-300 rounded-md p-2 mb-2"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md py-2 px-4"
            onClick={calculateBMI}
          >
            Calculate
          </button>
          {bmi && (
            <div className="border border-gray-300 rounded-md p-2">
              <strong>BMI:</strong> {bmi}
              <br />
              <strong>Weight Category:</strong> {weightCategory}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
