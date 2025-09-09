# Testing

> [!NOTE]
> Return back to the [README.md](README.md) file.

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate the index HTML file.

| File | URL | Screenshot | Notes |
| ---| --- | --- | --- |
| [index.html](/index.html) | [W3 Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Flander.apeskinian.com%2F) | ![screenshot](/documentation/testing/validation/validation_html.png) | No warnings or errors found. |

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate my CSS file.

| File | Screenshot | Notes |
| --- | --- | --- |
| [App.css](/src/App.css) | ![screenshot](/documentation/testing/validation/validation_css.png) | No errors or warnings found. |

### JavaScript & JSX

I used [ESLint](https://eslint.org/) to validate all JavaScript and JSX code in real time during development.

To ensure consistent code quality and catch issues early, I used a modular ESLint setup tailored for JavaScript, JSX, Cypress, and Vitest environments. The configuration supports React Fast Refresh, enforces best practices, and allows pragmatic overrides where necessary.

```
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import cypress from 'eslint-plugin-cypress';
import vitest from 'eslint-plugin-vitest';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'semi': ['error', 'always'],
    },
  },
  {
    files: ['cypress/**/*.js'],
    plugins: { cypress },
    ...cypress.configs.recommended,
  },
  {
    files: ['**/*.test.{js,jsx}'],
    plugins: { vitest },
    ...vitest.configs.recommended,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals,
      },
    },
  }
]);
```

## Responsiveness

I've tested my deployed project to check for responsiveness issues. For mobile devices I included PWA installed versions as well as portrait and landscape orientations.

| Device | Whole Map View | Highlighted POI | Notes |
| --- | --- | --- | --- |
| Mobile (devtools) | ![mobile devtools](documentation/testing/responsiveness/mobile_devtools_map.png) | ![mobile devtools](documentation/testing/responsiveness/mobile_devtools_poi.png) | Works as expected. |
| Tablet (devtools) | ![tablet devtools](documentation/testing/responsiveness/tablet_devtools_map.png) | ![tablet devtools](documentation/testing/responsiveness/tablet_devtools_poi.png) | Works as expected. |
| Desktop (devtools) | ![desktop devtools](documentation/testing/responsiveness/desktop_devtools_map.png) | ![desktop devtools](documentation/testing/responsiveness/desktop_devtools_poi.png) | Works as expected. |
| 2k Screen (devtools) | ![2k devtools](documentation/testing/responsiveness/2k_devtools_map.png) | ![2k devtools](documentation/testing/responsiveness/2k_devtools_poi.png) | Works as expected. |
| iPhone 16 Pro (portrait) | ![iphone](documentation/testing/responsiveness/iphone_portrait_map.PNG) | ![iphone](documentation/testing/responsiveness/iphone_portrait_poi.PNG) | Works as expected. |
| iPhone 16 Pro (landscape) | ![iphone](documentation/testing/responsiveness/iphone_landscape_map.PNG) | ![iphone](documentation/testing/responsiveness/iphone_landscape_poi.PNG) | Some clipping on two line POI labels. |
| iPhone 16 Pro PWA (portrait) | ![iphone](documentation/testing/responsiveness/iphone_pwa_portrait_map.PNG) | ![iphone](documentation/testing/responsiveness/iphone_pwa_portrait_poi.PNG) | Works as expected. |
| iPhone 16 Pro PWA (landscape) | ![iphone](documentation/testing/responsiveness/iphone_pwa_landscape_map.PNG) | ![iphone](documentation/testing/responsiveness/iphone_pwa_landscape_poi.PNG) | Works as expected. |
| iPad Mini (portrait) | ![ipad mini](documentation/testing/responsiveness/ipadmini_portrait_map.PNG) | ![ipad mini](documentation/testing/responsiveness/ipadmini_portrait_poi.PNG) | Works as expected. |
| iPad Mini (landscape) | ![ipad mini](documentation/testing/responsiveness/ipadmini_landscape_map.PNG) | ![ipad mini](documentation/testing/responsiveness/ipadmini_landscape_poi.PNG) | Works as expected. |
| iPad Mini PWA (portrait) | ![ipad mini](documentation/testing/responsiveness/ipadmini_pwa_portrait_map.PNG) | ![ipad mini](documentation/testing/responsiveness/ipadmini_pwa_portrait_poi.PNG) | Works as expected. |
| iPad Mini PWA (landscape) | ![ipad mini](documentation/testing/responsiveness/ipadmini_pwa_landscape_map.PNG) | ![ipad mini](documentation/testing/responsiveness/ipadmini_pwa_landscape_poi.PNG) | Works as expected. |
| Samsung Galaxy Tab 6 Lite (portrait) | ![galaxy tab](documentation/testing/responsiveness/galaxytab_portrait_map.jpg) | ![galaxy tab](documentation/testing/responsiveness/galaxytab_portrait_poi.jpg) | Works as expected. |
| Samsung Galaxy Tab 6 Lite (landscape) | ![galaxy tab](documentation/testing/responsiveness/galaxytab_landscape_map.jpg) | ![galaxy tab](documentation/testing/responsiveness/galaxytab_landscape_poi.jpg) | Works as expected. |
| Samsung Galaxy Tab 6 Lite PWA (portrait) | ![galaxy tab](documentation/testing/responsiveness/galaxytab_pwa_portrait_map.jpg) | ![galaxy tab](documentation/testing/responsiveness/galaxytab_pwa_portrait_poi.jpg) | Works as expected. |
| Samsung Galaxy Tab 6 Lite PWA (landscape) | ![galaxy tab](documentation/testing/responsiveness/galaxytab_pwa_landscape_map.jpg) | ![galaxy tab](documentation/testing/responsiveness/galaxytab_pwa_landscape_poi.jpg) | Works as expected. |
| MacBook Air M3 | ![macbook air](documentation/testing/responsiveness/macbook_map.png) | ![macbook air](documentation/testing/responsiveness/macbook_poi.png) | Works as expected. |
| 2K Monitor | ![2k monitor](documentation/testing/responsiveness/2k_monitor_map.png) | ![2k monitor](documentation/testing/responsiveness/2k_monitor_poi.png) | Works as expected. |

## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Page | Chrome | Firefox | Safari | Edge | Notes |
| --- | --- | --- | --- | --- | --- |
| Map | ![chrome](documentation/testing/browsers/chrome_map.png) | ![firefox](documentation/testing/browsers/firefox_map.png) | ![safari](documentation/testing/browsers/safari_map.png) | ![edge](documentation/testing/browsers/edge_map.png) | No issues found. |
| Highlighted POI | ![chrome](documentation/testing/browsers/chrome_poi.png) | ![firefox](documentation/testing/browsers/firefox_poi.png) | ![safari](documentation/testing/browsers/safari_poi.png) | ![edge](documentation/testing/browsers/edge_poi.png) | POI marker in Safari is pixelated. |

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues. Some warnings are outside of my control, and mobile results tend to be lower than desktop.

| Mobile | Desktop | Notes |
| --- | --- | --- |
| ![lighthouse](documentation/testing/lighthouse/lighthouse_mobile.png) | ![lighthouse](documentation/testing/lighthouse/lighthouse_desktop.png) | Mobile performance is slower in lighthouse test. |