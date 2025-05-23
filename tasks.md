# Tasks for Technical Interview

> Please commit regularly and open a PR for each ticket using the format: `<conventional_type>/ticket_id/friendly_name`
> For example: `feat/TECH-002/dashboard-stability`

## Networking Tickets

**TECH-001: Dashboard Stability and Network Optimization** - [ ]

- **Description:** The dashboard occasionally crashes during data loading and makes more network requests than necessary.
- **Acceptance Criteria:**
  - Dashboard loads without crashing under all test conditions
  - Network requests are made only when necessary (no duplicate or looping requests)
  - Console shows no React warnings about effects or state updates
  - Dashboard gracefully handles API errors
- **Suggested Areas to Explore:** Examine React effect dependencies and how state updates are triggered.

---

**TECH-002: Projects List Pagination** - [ ]

- **Description:** The projects list needs to handle larger datasets efficiently.
- **Acceptance Criteria:**
  - Users can navigate through pages of projects
  - Clear indication of current page and total available pages
  - Smooth transitions between pages with appropriate loading states
  - Performance remains consistent regardless of dataset size
- **Suggested Areas to Explore:** Consider how to integrate with the existing API pagination parameters and maintain UI state during navigation.

**TECH-003: Users Management Page Implementation** - [ ]

- **Description:** Create a dedicated page for user management according to the sidebar navigation item.
- **Acceptance Criteria:**
  - Page accessible via the sidebar link
  - Users displayed in a tabular format with key information
  - Pagination controls that maintain state during navigation
  - Empty, loading, and error states handled appropriately
  - (Bonus) Search functionality
  - (Bonus) Efficient page transitions
- **Suggested Areas to Explore:** Consider reusable patterns for data tables and how to optimize the user experience for navigating large datasets.

---

## Performance Tickets

**PERF-001: Dashboard Data Loading Performance Optimization** - [ ]

- **Description:** Users report that the dashboard takes too long to load initially. We need to improve the loading experience.
- **Acceptance Criteria:**
  - Dashboard initial load time reduced by at least 40%
  - Users see meaningful content within 2 seconds of page load
  - All dashboard widgets maintain functionality
  - No console errors or warnings during load process
- **Suggested Areas to Explore:** Consider how data fetching could be streamlined or parallelized, and whether all data is needed immediately.

## Layout Tickets

**UI-001: Fixed Navigation with Scrollable Content Area** - [ ]

- **Description:** Users need the ability to access navigation elements without scrolling back to the top of the page.
- **Acceptance Criteria:**
  - Navigation elements remain accessible regardless of scroll position
  - Content area should scroll independently
  - Layout remains responsive across all device sizes (mobile, tablet, desktop)
  - No important content is hidden or cut off
- **Suggested Areas to Explore:** Look into CSS position properties and layout techniques for keeping elements fixed while allowing other content to scroll.

## UI Cleanup Tickets

**UI-002: Navigation System Simplification** - [ ]

- **Description:** Our navigation system has redundancies and inconsistencies that need to be addressed, can you remove the navigation items in the navbar at the top.
- **Acceptance Criteria:**
  - Navigation is intuitive and consistent across the application
  - No duplicate navigation options
  - Sidebar contains only necessary links for core functionality
  - Code is maintainable and follows DRY principles
- **Suggested Areas to Explore:** Review how navigation items are structured and whether the code could be more maintainable through dynamic generation.

---

**UI-003: Dashboard Metrics Performance Improvement** - [ ]

- **Description:** The metrics cards on the dashboard cause performance issues due to excessive rendering.
- **Acceptance Criteria:**
  - Metrics display without visible performance lag
  - No console warnings about excessive renders
  - Metrics values update correctly when data changes
  - Visual presentation remains appealing and clear
- **Suggested Areas to Explore:** Consider how state updates are triggered during animations and whether the current approach is optimal.

## Error Handling Tickets

**TECH-004: API Function Error Handling Enhancement** - [ ]

- **Description:** API functions need to handle errors gracefully to prevent application failures, specifically `fetchUserData`
- **Acceptance Criteria:**
  - Application remains functional when API requests fail
  - Users receive appropriate feedback when data cannot be loaded
  - Errors are logged for debugging purposes
  - Recovery paths are available where appropriate
- **Suggested Areas to Explore:** Look at current error handling patterns and how they might be improved, particularly in the fetchUserData function.

---

**TECH-005: API Data Fetching Pattern Standardization** - [ ]

- **Description:** Our approach to data fetching is inconsistent across components, leading to maintenance challenges.
- **Acceptance Criteria:**
  - Consistent data fetching pattern used throughout the application
  - Components handle loading, error, and success states uniformly
  - Reduced code duplication for data fetching logic
  - Improved developer experience for adding new data-dependent features
- **Suggested Areas to Explore:** Research patterns like custom hooks for data fetching, or libraries that solve similar problems (like react-query) for inspiration.
