# [a| lander](https://lander.apeskinian.com)

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/apeskinian/project_lander)](https://www.github.com/apeskinian/project_lander/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/apeskinian/project_lander)](https://www.github.com/apeskinian/project_lander/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/apeskinian/project_lander)](https://www.github.com/apeskinian/project_lander)

## A simple and elegant landing zone picker for your next Fortnite Battle Royale!

Tired of the same drop spots? Debating with your squad about where to land? Let a|lander take the pressure off.

**a|lander** is your intuitive, map-driven companion for Fortnite. Designed to answer the age-old question: “Where are we landing?” With a single tap, it randomly selects a point of interest (POI) from the current map and zooms in to highlight the spot. Whether you’re looking to shake up your routine or explore hidden corners you’ve never visited, a|lander makes every exciting.

Choose between:

-  All available POIs and named locations for full exploration.
-  Main POIs only for a more focused experience.

No more indecision. No more arguments. Just a touch of fate guiding your next landing zone.

Data for this app is provided by [Fortnite-API](https://fortnite-api.com/).

![screenshot](documentation/lander-mockup.png)

source: [Am I Responsive Multi Device Website Mockup Generator](https://ui.dev/amiresponsive?url=https://lander.apeskinian.com/)

## UX

### Strategy

**Purpose**
- Provide the user with a landing site for a Battle Royale in Fortnite that is randomly chosen from the current list of POIs provided by the API.

**Primary User Needs**
- Users need a suggested landing site with minimal interaction.
- They also need to repeat this easily.

### Scope

**Features**

Full details on [Features](#features) can be viewed below, essentially I wanted to include:
- Easy interaction with minimal input to get a landing site.
- Easily repeatable action to get new suggestions.
- The ability to toggle between the full POI list and the main POIs provided by the API.

**Content Requirements**

- Up to date map image for the current iteration of Fortnite.
- Up to date POI information for the current iteration of Fortnite.
- Easy to view main map area with clear indicator of selected site.
- Easy toggle to change between POI preferences.
- Error messages if there are issues fetching data.

### Structure

The site is a Single Page Application and by design is simple and easy to use.

There is a header at the top of the page containing the app name and a toggle switch. Clicking on the **a|** of the title will take the user to my [portfolio](https://www.apeskinian.com) site. Clicking on the **lander** portion will reset the app by removing any selected POIs and zooming out.

The toggle on the right hand side of the header will control which POI set is used to generate a landing site. Toggling this will change the POI set accordingly whilst resetting the map ready to start again.

The main focus of the app is the map area that shows the current Fortnite Battle Royale map. To start the user clicks anywhere on the map. When a POI is picked, a marker will be placed and the map will zoom in tighter onto the marker. Clicking again will pick another marker and the process will repeat.

If there are any errors in fetching the data, the map will be replaced by an information message informing the user.

The bottom of the page contains a footer with another link to my [portfolio](https://www.apeskinian.com) along with links to my [LinkedIn](https://www.linkedin.com/in/apeskinian/) profile and [GitHub](https://github.com/apeskinian) profile.