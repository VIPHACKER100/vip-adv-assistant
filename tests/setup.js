import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

// Mock global browser APIs
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

global.navigator.getBattery = jest.fn().mockResolvedValue({
  level: 1,
  charging: true,
  addEventListener: jest.fn(),
});

global.navigator.connection = {
  effectiveType: '4g',
  addEventListener: jest.fn(),
};

global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.SpeechSynthesisUtterance = class {
  constructor() {}
};

global.window.speechSynthesis = {
  speak: jest.fn(),
  getVoices: jest.fn().mockReturnValue([]),
};

// Mock faceapi
global.faceapi = {
  nets: {
    tinyFaceDetector: { loadFromUri: jest.fn() },
    faceLandmark68Net: { loadFromUri: jest.fn() },
    faceRecognitionNet: { loadFromUri: jest.fn() },
  },
  detectAllFaces: jest.fn(),
  detectSingleFace: jest.fn(),
  matchDimensions: jest.fn(),
  resizeResults: jest.fn(),
  draw: {
    drawDetections: jest.fn(),
    drawFaceLandmarks: jest.fn(),
  },
  euclideanDistance: jest.fn(),
  TinyFaceDetectorOptions: class {},
};

// Standard mocks for DOM
window.scrollTo = jest.fn();
window.alert = jest.fn();
window.confirm = jest.fn().mockReturnValue(true);
window.prompt = jest.fn();
window.requestAnimationFrame = jest.fn((cb) => cb());
