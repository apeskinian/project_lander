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

## Defensive Programming

Defensive programming was manually tested with the below user acceptance testing:

### Page Navigation
| Expectation | Test | Result | Screenshot |
| --- | --- | --- | --- |
| A help modal is shown to the user on first visit to the site. | Visit the site for the first time. | SUCCESS - the modal is shown. | ![screen recording](documentation/testing/manual/navigation/help_modal_show.gif) |
| The help modal is not shown automatically if the user revisits the site. | After the first visit, refresh the page. | SUCCESS - the modal does not appear automatically. | ![screen recording](documentation/testing/manual/navigation/help_modal_not_shown_again.gif) |
| Clicking outside the modal when it is shown does nothing. | When the help modal is being shown, try and click the map and other elements. | SUCCESS - the modal stays open. | ![screen recording](documentation/testing/manual/navigation/help_modal_clicking_around.gif) |
| The help modal can be closed with the 'close' button. | Click on the 'close' button of the help modal. | SUCCESS - the modal is closed. | ![screen recording](documentation/testing/manual/navigation/help_modal_close_button.gif) |
| The help modal can be closed with the 'escape' key. | Press the 'escape' key on the keyboard when the help modal is displayed. | SUCCESS - the modal is closed. | ![screen recording](documentation/testing/manual/navigation/help_modal_escape_key.gif) |
| Clicking on the **a\|** portion of the page title will open the [portfolio](https://www.apeskinian.com) site in a new browser tab. | Click on the **a\|** in the page header. | SUCCESS - the user is taken to the [portfolio](https://www.apeskinian.com) site in a new browser tab. | ![screen recording](documentation/testing/manual/navigation/portfolio_link_a.gif) |
| Clicking on the toggle at the top of the page will switch between **All POIs** and **Main POIs** being shown. | Click the toggle input in the page header. | SUCCESS - the POI sets are switched. | ![screen recording](documentation/testing/manual/navigation/toggle_click.gif) |
| Clicking on the **apeskinian\|** link at the bottom of the page will open the [portfolio](https://www.apeskinian.com) site in a new browser tab. | Click on the **apeskinian\|** link in the page footer. | SUCCESS - the user is taken to the [portfolio](https://www.apeskinian.com) site in a new browser tab. | ![screen recording](documentation/testing/manual/navigation/portfolio_link_apeskinian.gif) |
| Clicking on the **i** button at the bottom of the page will show the help modal. | Click on the **i** button in the page footer. | SUCCESS - the modal is shown. | ![screen recording](documentation/testing/manual/navigation/modal_shown_with_i.gif) |
| When the API is being accessed, a loading indicator is shown to the user. | In a development server simulate a delay and reload the page. | SUCCESS - a loading message can be seen. | ![screen recording](documentation/testing/manual/navigation/loading_message.gif) |
| If there is an error loading the data the user is shown a message. | In a development server manually create an error when fetching data. | SUCCESS - an error message is displayed. | ![screen recording](documentation/testing/manual/navigation/error_message.gif) |
| If there is no data available the user is shown a message. | In a development server, do not send any map data to the client. | SUCCESS - a no map data message is displayed. | ![screen recording](documentation/testing/manual/navigation/no_map_data_message.gif) |

### POI Picking
| Expectation | Test | Result | Screenshot |
| --- | --- | --- | --- |
| Clicking on the map displays a marker to a POI and then zooms in to show a label for the POI. | Click on the map. |  |  |
| If a POI is already being shown, clicking the map again will clear the POI, zoom out, select a new POI, show a marker, and zoom in again to show the label for the POI. | When a POI is already being shown, click on the map. |  |  |
| Clicking on the **lander** portion of the page title will clear any current POI selection and reset the map. | Click on the **lander** portion of the title when a POI is being shown. |  |  |
| Clicking on the toggle at the top of the page will also clear any current POI selection and reset the map. | Click on the toggle input when a POI is being shown. |  |  |
| Clicking on the **lander** portion of the page title will cancel any current selection mid-process and reset the map. | Click on the **lander** portion of the title when a POI is actively being selected. |  |  |
| Clicking on the toggle at the top of the page will cancel any current selection mid-process and reset the map. | Click on the toggle input when a POI is actively being selected. |  |  |
| Clicking on the map multiple times while a POI is being selected will not interrupt the process.  | When a POI is actively being selected, click the map multiple times. |  |  |
| Clicking on the map multiple times while a POI is being selected will not queue up multiple clicks and start a chain of selections. | When a POI is actively being selected, click the map multiple times. |  |  |
| Double tapping on a mobile device will not activate a zoom in. | Double tap the screen on a mobile device. |  |  |