"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const app_config_1 = require("./app/app.config");
const app_1 = require("./app/app");
(0, platform_browser_1.bootstrapApplication)(app_1.App, app_config_1.appConfig)
    .catch((err) => console.error(err));
