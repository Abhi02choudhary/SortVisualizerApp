export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// Quick Sort
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;
  const pivotIdx = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
  const pivot = array[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push([i, endIdx]); // Compare
    animations.push([i, endIdx]); // Revert
    if (array[i] < pivot) {
      animations.push([i, array[pivotIdx]]);
      animations.push([pivotIdx, array[i]]);
      [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
      pivotIdx++;
    }
  }
  animations.push([pivotIdx, array[endIdx]]);
  animations.push([endIdx, array[pivotIdx]]);
  [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
  return pivotIdx;
}

// Heap Sort
export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  buildMaxHeap(array, animations);
  for (let i = array.length - 1; i > 0; i--) {
    animations.push([0, i]); // Swap
    animations.push([0, i]); // Revert
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, 0, i - 1, animations);
  }
  return animations;
}

function buildMaxHeap(array, animations) {
  const n = array.length;
  for (let i = Math.floor(n / 2); i >= 0; i--) {
    heapify(array, i, n - 1, animations);
  }
}

function heapify(array, rootIdx, endIdx, animations) {
  let largest = rootIdx;
  const leftIdx = 2 * rootIdx + 1;
  const rightIdx = 2 * rootIdx + 2;

  if (leftIdx <= endIdx && array[leftIdx] > array[largest]) {
    largest = leftIdx;
  }
  if (rightIdx <= endIdx && array[rightIdx] > array[largest]) {
    largest = rightIdx;
  }
  if (largest !== rootIdx) {
    animations.push([rootIdx, largest]); // Swap
    animations.push([rootIdx, largest]); // Revert
    [array[rootIdx], array[largest]] = [array[largest], array[rootIdx]];
    heapify(array, largest, endIdx, animations);
  }
}

// Bubble Sort
export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1]); // Compare
      animations.push([j, j + 1]); // Revert
      if (array[j] > array[j + 1]) {
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, array[j]]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return animations;
}
