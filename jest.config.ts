/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",

  testEnvironment: "jsdom",
  roots: ["<rootDir>/client/src"],
  transform: {
    ".(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest-config/file-mock.ts",
    ".(css|less)$": "<rootDir>/jest-config/style-mock.ts",
  },
};
