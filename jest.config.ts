import { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@/component/(.*)$": "<rootDir>/src/component/$1",
        "^@/api/(.*)$": "<rootDir>/src/api/$1",
        "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^@/tests/(.*)$": "<rootDir>/src/tests/$1",
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    setupFiles: ["<rootDir>/setupJest.ts"],
};

export default config;
