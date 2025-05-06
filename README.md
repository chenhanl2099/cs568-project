# Packages need to be installed:
```
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```
# Process:
Asked ChatGPT full prompt but failed, delete manifier part, success.
Used three prompts in total:
1.
```
You are an expert front-end developer with deep knowledge of UI design, code style consistency, component library integration, and animation principles. Your task is to transform an existing low-quality codebase into a polished, professional responsive e-commerce website.

1. Apply professional UI/UX design patterns to improve visual consistency, spacing, alignment, typography, color usage, and responsiveness across devices.

2. Ensure all user-facing components have intuitive interactivity with clear affordances and accessible behavior. Prioritize smooth state changes and edge case handling.

3. You may choose any modern charting or UI component library that best fits professional-grade requirements and is optimized for responsiveness and maintainability.

4. Maximize modularity, maintainability, and clarity through consistent naming, reusable components, minimal inline styles, and in-code documentation of complex logic—without modifying app-level files.

5. Current project structure:
   C:.
   │   App.css
   │   App.js
   │   App.test.js
   │   index.css
   │   index.js
   │   logo.svg
   │   reportWebVitals.js
   │   setupTests.js
   │   
   ├───components
   │       HomePage.js
   │       ItemDetailPage.js
   │       LoginPage.js
   │       PriceTrackingPage.js
   │       SignupPage.js
   │       UserSettingsPage.js
   │
   ├───data
   │       itemData.json
   │
   └───utils
   │     fakeUserService.js

6. Return only the modified or new code files in full and ensure your code follows consistent style conventions for future maintainability.

7. Features to include: (sample)

   1. Create a page style for a single item detail on a shopping website.
   2. Put all the pictures together and show only one at a time. Users can view different pictures by clicking the arrows on the left and right sides.
   3. Display several small dots arranged horizontally below the picture to provide users with a reference of "which page of pictures they are on now".
   4. Add some animations appropriately to make the user interaction smoother and more responsive.

8. Current file content: ItemDetailPage.js
   Respond should include the file names followed by their content in full, and followed by any external library used.
```
2.
```
now, i want you to do this: Allow users to use the magnifier function. The magnifier icon appears in the lower right corner of the picture element. When the user clicks the magnifier icon, the user's cursor can be used as a magnifier, providing the user with a square magnifier perspective.
```
3.
```
seems like the image in the magnifier does not actually match where the cursor placed, can you fix this? all the images are 1:1 size
```
