import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  "^.+\\.(js|jsx)$": "babel-jest",
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      "<rootDir>/fileTransformer.js"
  },
  preset: "ts-jest",
  "testEnvironment": "jsdom",
  // "moduleNameMapper": {
  //   "\\.svg": "<rootDir>/__mocks__/svg.js"
  // }
};

export default config;