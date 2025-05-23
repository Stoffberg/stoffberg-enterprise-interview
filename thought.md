asic Bug Reports:

1. Start by fixing all the issues in the application they run into while page load:
   1.1. `recentActivity: activitiesResponse.slice(0, 5),`, correct the type from the backend and do `activitiesResponse.activities.slice(0, 5)`
   1.2. `pendingTasks: projectsResponse.reduce(`, correct the type from the backend and do `pendingTasks: projectsResponse.data.reduce(`
   1.3. `{activities.map((activity) => (`, `.map is not a function`, correct the type from the backend and do `setActivities(data.activies)`
   1.3.1. Bonus points: Spot bug with the `document.addEventListener("visibilitychange", handleVisibilityChange);` never being removed.
   1.4. `{projects.map((project) => (`, `projects.map is not a function`, correct the type from the backend and do `setProjects(data.data)`
   1.4.1. Bonus points: Spot the random `await new Promise((resolve) => setTimeout(resolve, Math.random() * 800));` in the useEffect.

2. Identify Next Major Problems:
   2.1 Network requests firing off the whole time
   2.1.1. Debug steps: See where the data is being fetched and console.log or use debugger
   2.1.2. Solution steps: Remove `data` from the dependency array in the `dashboard.tsx` page

   2.2. Network requests for activities firing off the whole time
   2.2.1. Debug steps: See where the data is being fetched and console.log or use debugger
   2.2.2. Solution steps: Remove `activities` from the dependency array in the `ActivityLog.tsx` page
