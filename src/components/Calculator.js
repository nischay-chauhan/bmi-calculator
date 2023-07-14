import React, { useState } from 'react';
import { useEffect } from 'react';
const Calculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [weightCategory, setWeightCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load BMI data from local storage on initial component mount
  useEffect(() => {
    const storedWeight = localStorage.getItem('weight');
    const storedHeight = localStorage.getItem('height');
    const storedBmi = localStorage.getItem('bmi');
    const storedWeightCategory = localStorage.getItem('weightCategory');

    if (storedWeight && storedHeight && storedBmi && storedWeightCategory) {
      setWeight(storedWeight);
      setHeight(storedHeight);
      setBmi(storedBmi);
      setWeightCategory(storedWeightCategory);
    }
  }, []);

  
  // Save BMI data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('bmi', bmi);
    localStorage.setItem('weightCategory', weightCategory);
  }, [weight, height, bmi, weightCategory]);

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

    // Check if weight and height are positive numbers
    if (weightNum < 0 || heightNum < 0) {
      setErrorMessage('Weight and height cannot be negative');
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

    // Update the state with the calculated BMI, weight category, and clear the error message
    setBmi(bmiValue.toFixed(2)); // Round to 2 decimal places
    setWeightCategory(category);
    setErrorMessage('');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 h-96 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">BMI Calculator</h2>
        <br></br>
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
          {errorMessage && (
            <div className="text-red-500">{errorMessage}</div>
          )}
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
