# Hcmatrix v3.0 App Frontend

This project is a human resource solution that is created using react for the frontend. For more information on project, visit [https://www.hcmatrix.com/](https://www.hcmatrix.com/)

## Tech Stack
The codebase is primarily written in typescript. The following technologies were integral to the creation of the application
- React Query was used for data fetching and submissions (Rest API calls to backend)
- Ant Design was used as a UI component library
- Tailwind was also used for styling primarily, with a bit of styled components
- Unit & Integration Tests were carried out using Jest as a test runner and assertion library, while react testing library was used to provide virtual DOMs for testing React components.
- Static Code Analysis was covered by Eslint
- React Router DOM was used for routing within the application
- React Auth Kit was used for authentication
- ChartJs was used for data visualization


## Project Overview & Architecture & Guide
- The Project follows the [Container/Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern/) that fetches data that is fed to at most two components (listView & gridView). This components get their pageSize values from the src/Constants/index.ts (so as to prevent reptition and enforce consistency). This pattern should be followed whenever any sought of paginated data is fetched.
- The project makes use of absolute imports, the project also has its folder structure arranged as modules which are namely:  `Self Service(has children)`, `Payroll`, `Performance`, `Users & Company (Core Module)`,


## Coding Style & Folder Structure

## Contribution Rules



