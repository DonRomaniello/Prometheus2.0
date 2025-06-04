```json
{
  "layout" : [
    "content-renderer"
  ]
}
```
# Welcome to Prometheus Studios

This is the home page content. You can edit this markdown file to change what appears on the home page.

## Features

- **Markdown-powered content**: Edit content as simple markdown files
- **React Router navigation**: Navigate between pages with clean URLs
- **Consistent styling**: All content rendered through a standardized component
- **Unified CSS System**: All styles in one file with CSS variables
- **Grid System**: Easy-to-use grid layout classes
- **Utility Classes**: Spacing, typography, and layout utilities

## CSS System

The new CSS system includes:

### CSS Variables
Edit the variables at the top of `src/styles/global.css` to customize:
- Colors: `--color-primary`, `--color-secondary`, etc.
- Spacing: `--spacing-xs` through `--spacing-xxl`
- Font sizes: `--font-size-xs` through `--font-size-xxxl`

Available layouts:
- `layout-two-column` - Main content + sidebar
- `layout-three-equal` - Three equal columns  
- `grid-auto-fit` - Auto-responsive card layouts
- Visit `/grid-demo` to see examples!

### Utility Classes
- Spacing: `m-md`, `p-lg`, `mt-xl`, etc.
- Text: `text-lg`, `font-bold`, `text-center`
- Layout: `flex`, `justify-center`, `items-center`

Navigate to different pages using the menu above, or visit URLs directly:
- `/about` - Learn more about this project
- `/contact` - Get in touch

All content is stored as markdown files in the `src/content` directory and can be easily edited.
