import { config as envConfig } from "dotenv";
import path from "path";

envConfig({ path: path.resolve(".env") });

import App from "./core/App.js";

(async () => new App())();
