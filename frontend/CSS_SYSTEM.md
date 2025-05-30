# CSS System Documentation

This project uses a unified CSS system with variables, utilities, and a grid system for easy customization and consistent styling.

## File Structure
- `src/styles/global.css` - Single CSS file containing all styles

## CSS Variables

All colors, spacing, and typography can be customized by editing the CSS variables at the top of `global.css`:

### Colors
```css
--color-primary: #007bff;
--color-secondary: #6c757d;
--color-success: #28a745;
--color-danger: #dc3545;
--color-warning: #ffc107;
```

### Spacing
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-xxl: 3rem;     /* 48px */
```

### Typography
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-xxl: 1.5rem;    /* 24px */
--font-size-xxxl: 2rem;     /* 32px */
```

## Grid System

The grid system uses CSS Grid for flexible layouts:

### Basic Grid
```jsx
<div className="grid grid-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Grid with Column Spans
```jsx
<div className="grid grid-4">
  <div className="col-1">1 column</div>
  <div className="col-2">2 columns</div>
  <div className="col-1">1 column</div>
</div>
```

### Available Grid Classes
- `.grid-1` through `.grid-12` - Number of columns
- `.col-1` through `.col-12` - Column span

### Container Classes
- `.container` - Max-width with centered content
- `.container-fluid` - Full-width with padding

## Utility Classes

### Spacing
```jsx
// Margin
<div className="m-md">All margins</div>
<div className="mt-lg mb-sm">Top and bottom margins</div>
<div className="ml-xl mr-xs">Left and right margins</div>

// Padding
<div className="p-lg">All padding</div>
<div className="pt-md pb-lg">Top and bottom padding</div>
<div className="pl-sm pr-md">Left and right padding</div>
```

### Typography
```jsx
<h1 className="text-xxxl font-bold">Large bold heading</h1>
<p className="text-lg text-secondary">Large secondary text</p>
<span className="text-sm text-muted">Small muted text</span>
```

### Flexbox
```jsx
<div className="flex justify-center items-center">
  Centered content
</div>

<div className="flex justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

### Text Alignment
```jsx
<div className="text-center">Centered text</div>
<div className="text-right">Right-aligned text</div>
```

## Component Examples

### Two-Column Layout
```jsx
<div className="container">
  <div className="grid grid-2">
    <div className="p-lg">
      <h2>Left Column</h2>
      <p>Content here</p>
    </div>
    <div className="p-lg">
      <h2>Right Column</h2>
      <p>Content here</p>
    </div>
  </div>
</div>
```

### Card Layout
```jsx
<div className="bg-secondary p-lg m-md">
  <h3 className="text-xl font-semibold mb-md">Card Title</h3>
  <p className="text-base mb-lg">Card content goes here</p>
  <button className="bg-primary text-light p-sm">Action</button>
</div>
```

### Navigation Example
```jsx
<nav className="navigation">
  <div className="container">
    <div className="flex justify-between items-center">
      <div className="font-bold text-lg">Logo</div>
      <ul className="flex gap-lg">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  </div>
</nav>
```

## Responsive Design

The grid system automatically collapses to single column on mobile devices. You can customize breakpoints in the media queries at the bottom of `global.css`.

## Customization

To change the overall appearance:

1. **Edit CSS variables** at the top of `global.css`
2. **Add new utility classes** following the existing pattern
3. **Modify component styles** in the component-specific sections

### Example: Change Primary Color
```css
:root {
  --color-primary: #28a745; /* Change from blue to green */
}
```

### Example: Add New Spacing
```css
:root {
  --spacing-huge: 4rem; /* Add new spacing size */
}

/* Add utility classes */
.m-huge { margin: var(--spacing-huge); }
.p-huge { padding: var(--spacing-huge); }
```

This system provides flexibility while maintaining consistency across your application.
