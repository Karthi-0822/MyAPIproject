// # .env.dev
// BASE_URL=http://localhost:3000
// API_TOKEN=dev-token-here
// TEST_EMAIL=dev@test.com
// TEST_PASSWORD=devpassword

// # .env.staging
// BASE_URL=https://staging-api.yourapp.com
// API_TOKEN=staging-token-here
// TEST_EMAIL=staging@test.com
// TEST_PASSWORD=stagingpassword

// # .env.production
// BASE_URL=https://api.yourapp.com
// API_TOKEN=prod-token-here
// TEST_EMAIL=prod-test@yourapp.com
// TEST_PASSWORD=prodpassword

// playwright.config.ts — projects per environment

// import { defineConfig } from '@playwright/test';
// import dotenv from 'dotenv';
// import path from 'path';

// // Load .env file based on ENV variable — default to dev
// const env = process.env.ENV ?? 'dev';
// dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

// export default defineConfig({
//   testDir: './tests/api',
//   reporter: 'html',

//   use: {
//     baseURL: process.env.BASE_URL,
//     extraHTTPHeaders: {
//       'Authorization': `Bearer ${process.env.API_TOKEN}`,
//       'Accept': 'application/json',
//     },
//   },

//   projects: [
//     { name: 'smoke', grep: /@smoke/, use: {} },
//     { name: 'regression', grep: /@regression/, use: {} },
//     { name: 'payments', grep: /@payments/, use: {} },
//   ],
// });
// Running against each environment
// # Dev (default)
// npx playwright test

// # Staging — smoke only
// ENV=staging npx playwright test --project=smoke

// # Production — smoke only (never run full regression on prod)
// ENV=production npx playwright test --project=smoke

// # Staging — full regression
// ENV=staging npx playwright test --project=regressioncopy
// Never run full regression on production. Write tests are destructive — POST, DELETE, and PATCH operations create real records, send real emails, and trigger real side effects. On production, smoke-only tests against read endpoints are the safe boundary.