import React from 'react';
import {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
  getBubbleSortAnimations
} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 2;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'pink';
const SECONDARY_COLOR = 'black';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      timeComplexity: null, // State to manage time complexity display
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS - 200; i++) {
      array.push(randomIntFromInterval(5, 300)); // Decrease maximum height to 300px
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    this.animateSorting(animations);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    this.animateSorting(animations);
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    this.animateSorting(animations);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    this.animateSorting(animations);
  }

  animateSorting(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  handleTimeComplexity(sortType) {
    let explanation = "";
    switch (sortType) {
      case 'mergeSort':
        explanation = "Merge Sort: O(n log n) time complexity in all cases.";
        break;
      case 'quickSort':
        explanation = "Quick Sort: O(n log n) average case, O(n^2) worst case.";
        break;
      case 'heapSort':
        explanation = "Heap Sort: O(n log n) time complexity in all cases.";
        break;
      case 'bubbleSort':
        explanation = "Bubble Sort: O(n^2) time complexity in all cases.";
        break;
      default:
        explanation = "";
    }
    this.setState({ timeComplexity: explanation });
  }

  testSortingAlgorithms() {
    const array = [];
    for (let i = 0; i < 1000; i++) {
      array.push(randomIntFromInterval(1, 1000));
    }
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);

    const mergeSortedArray = getMergeSortAnimations(array.slice());
    console.log("Merge Sort Test:", arraysAreEqual(javaScriptSortedArray, mergeSortedArray));

    // Similarly, test Quick Sort, Heap Sort, and Bubble Sort here
    // Ensure to compare their results with the JavaScript sorted array
  }

  render() {
    const { array, timeComplexity } = this.state;

    return (
      <div className="visualizer-container">
        <div className="navbar">
          <h1 className="heading">WELCOME TO SORTING VISUALIZATION</h1>
          <div className="button-container">
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button onClick={() => this.testSortingAlgorithms()}>
              Test Sorting Algorithms
            </button>
          </div>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
        <div className="time-complexity-container">
          <button onClick={() => this.handleTimeComplexity('mergeSort')}>Merge Sort T.C.</button>
          <button onClick={() => this.handleTimeComplexity('quickSort')}>Quick Sort T.C.</button>
          <button onClick={() => this.handleTimeComplexity('heapSort')}>Heap Sort T.C.</button>
          <button onClick={() => this.handleTimeComplexity('bubbleSort')}>Bubble Sort T.C.</button>
        </div>
        {timeComplexity && (
          <div className="time-complexity-card">
            <p>{timeComplexity}</p>
          </div>
        )}
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
