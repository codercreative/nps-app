# NPS - National Park Service App

A National Park Service app built with **React** and **Vite**. This project is part of [Code the Dream's](https://codethedream.org/) React course.

## Reason for Working on a National Park Service App

It is fun to work on a site about nature as this is something we all enjoy! Also, I love working with beautiful images - and the NPS API provides a rich supply. Finally, I appreciate the NPS API page which is clear and to the point.

## Description

This US National Parks app's home page showcases the breathtaking view of Yosemite, CA. The user is invited to "Go Explore" via the CTA button, which takes the user to a paginated list of all the US National Parks allowing the user to search by park name or browse the full list. Selecting a park opens a page with all the details for that park and the user can save the park to a "My Parks" page by clicking on the heart icon. Saved parks persist via Local Storage and the user can remove parks by clicking the heart icon. Clicking a park from the "My Parks" page also opens the detailed park view.

This app uses React Router library for smooth navigation between the pages and NavLink to highlight active/inactive pages for better UX.

## Details on Added Dependencies

Installed React Router. This library allows the user to navigate between different page views in my Single Page Application (SPA) without reloading the entire app / API.

## Instructions on How to Install and Run

- Copy the project URL and navigate to the folder on your local machine where you want to download the repo. Use the command `git clone` followed by the copied URL.

- Use `cd nps-app` to navigate to the folder. Run `npm install` (installing dependencies) and `npm run dev` (start the development server).

## Details needed for an API Connection

- This project uses the US National Park Service API which requires an API key.
- Visit the [NPS API documentation page](https://www.nps.gov/subjects/developer/api-documentation.htm) or go to the [Get Started Page](https://www.nps.gov/subjects/developer/get-started.htm).
- Fill in your first and last name, and email address (the reason for use is optional).
- The API key will be emailed to you right away.
- **Create an `.env.local` file in the root of your project and replace the api_key placeholder with your API key. See below.**

  ```env
  VITE_API_KEY=your_api_key_here
  ```

## Credits and API Access

- A shout-out to **US National Park Services** for granting access to their NPS API for free.
- Please note that all images on this app display credit to NPS Photo and/ or the photographer's name.
