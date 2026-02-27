"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvironmentVariables = () => {
    var _a;
    const requiredEnvVars = ['PORT', 'MONGO_URI', 'NODE_ENV'];
    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`❌ Missing required environment variable: ${key}`);
        }
    });
    const nodeEnv = (_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (nodeEnv !== 'development' && nodeEnv !== 'production') {
        throw new Error(`❌ NODE_ENV must be either "development" or "production", got "${process.env.NODE_ENV}"`);
    }
    return {
        PORT: process.env.PORT,
        MONGO_URI: process.env.MONGO_URI,
        NODE_ENV: nodeEnv,
    };
};
exports.envVars = loadEnvironmentVariables();
