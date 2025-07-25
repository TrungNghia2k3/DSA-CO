# DSA-CO Design System Documentation

## Color Palette

### Primary Background Colors
- **Main Background**: `#121418` (bg-default)
- **Layout Background**: `#1F202A` (layout-default-bg)
- **Card/Component Background**: `#2a2b38` (hover states)

### Text Colors
- **Primary Text**: `white` (text-default)
- **Secondary Text**: `#c9c9cf`
- **Muted Text**: `#71727A`
- **Code/Reference Text**: `#gray-300`

### Accent Colors
- **Primary Accent**: `#22c55e` (green-500) - Used for links, CTAs
- **Secondary Accent**: `#3b82f6` (blue-500) - Used for info, selections
- **Success**: `#16a34a` (green-600)
- **Warning**: `#ea580c` (orange-600)
- **Error**: `#dc2626` (red-600)
- **Info**: `#0ea5e9` (sky-500)

### UI Element Colors
- **Border Default**: `#374151` (gray-700)
- **Border Light**: `#4b5563` (gray-600)
- **Border Accent**: `#22c55e` (green-500)

## Dark Mode Component Styling Guidelines

### Container Components
```css
/* Primary containers */
.container-primary {
    @apply bg-default text-default;
}

/* Secondary containers */
.container-secondary {
    @apply layout-default-bg text-default;
}

/* Card containers */
.card-default {
    @apply layout-default-bg text-default border border-gray-700 rounded-lg;
}

/* Interactive cards */
.card-interactive {
    @apply layout-default-bg text-default border border-gray-700 rounded-lg 
           hover:bg-[#2a2b38] transition-colors duration-200;
}
```

### Input Components
```css
/* Default inputs */
.input-default {
    @apply bg-gray-800 text-white border border-gray-600 rounded-md 
           focus:border-green-500 focus:ring-2 focus:ring-green-500/20 
           placeholder:text-gray-400;
}

/* Select dropdowns */
.select-default {
    @apply bg-gray-800 text-white border border-gray-600 rounded-md 
           focus:border-green-500 focus:ring-2 focus:ring-green-500/20;
}
```

### Button Components
```css
/* Primary buttons */
.btn-primary {
    @apply bg-green-600 hover:bg-green-700 text-white font-medium 
           rounded-md transition-colors duration-200;
}

/* Secondary buttons */
.btn-secondary {
    @apply bg-gray-700 hover:bg-gray-600 text-white font-medium 
           rounded-md border border-gray-600 transition-colors duration-200;
}

/* Danger buttons */
.btn-danger {
    @apply bg-red-600 hover:bg-red-700 text-white font-medium 
           rounded-md transition-colors duration-200;
}

/* Disabled buttons */
.btn-disabled {
    @apply bg-gray-600 text-gray-400 cursor-not-allowed;
}
```

### Visualizer-Specific Components
```css
/* Visualizer containers */
.visualizer-container {
    @apply bg-gray-800/50 border border-gray-700 rounded-lg p-6;
}

/* Algorithm step indicators */
.step-indicator {
    @apply bg-gray-700 text-gray-300 border border-gray-600 rounded-md;
}

/* Active/selected elements */
.element-active {
    @apply bg-green-600 text-white border-green-500;
}

/* Secondary active elements */
.element-secondary {
    @apply bg-blue-600 text-white border-blue-500;
}

/* Tertiary active elements */
.element-tertiary {
    @apply bg-orange-600 text-white border-orange-500;
}

/* Inactive/available elements */
.element-inactive {
    @apply bg-gray-700 text-gray-300 border-gray-600;
}

/* Result/success elements */
.element-success {
    @apply bg-green-700/30 text-green-300 border-green-600;
}

/* Warning/attention elements */
.element-warning {
    @apply bg-orange-700/30 text-orange-300 border-orange-600;
}
```

### Status and Message Components
```css
/* Info messages */
.message-info {
    @apply bg-blue-900/20 text-blue-300 border border-blue-700 rounded-lg;
}

/* Success messages */
.message-success {
    @apply bg-green-900/20 text-green-300 border border-green-700 rounded-lg;
}

/* Warning messages */
.message-warning {
    @apply bg-orange-900/20 text-orange-300 border border-orange-700 rounded-lg;
}

/* Error messages */
.message-error {
    @apply bg-red-900/20 text-red-300 border border-red-700 rounded-lg;
}

/* Algorithm explanation boxes */
.algorithm-explanation {
    @apply bg-gray-800/30 text-gray-300 border border-gray-700 rounded-lg;
}
```

### Table Components
```css
/* Table containers */
.table-container {
    @apply border border-gray-700 rounded-lg overflow-hidden;
}

/* Table headers */
.table-header {
    @apply bg-gray-800 text-gray-300 font-semibold;
}

/* Table rows */
.table-row-odd {
    @apply bg-gray-900;
}

.table-row-even {
    @apply bg-gray-800;
}

/* Table cells */
.table-cell {
    @apply border border-gray-700 text-gray-300;
}
```

## Component Color Mapping

### Visualizer Elements
- **Fixed/Primary Element**: Green (`bg-green-600`, `border-green-500`)
- **Left Pointer**: Blue (`bg-blue-600`, `border-blue-500`)
- **Right Pointer**: Orange (`bg-orange-600`, `border-orange-500`)
- **Used/Selected**: Purple (`bg-purple-600`, `border-purple-500`)
- **Available/Unused**: Gray (`bg-gray-700`, `border-gray-600`)
- **Current/Active**: Yellow (`bg-yellow-600`, `border-yellow-500`)

### Interactive States
- **Hover**: Lighter shade of base color or `bg-opacity-80`
- **Focus**: Ring with `ring-2 ring-[color]-500/20`
- **Active**: Darker shade of base color
- **Disabled**: Gray tones (`bg-gray-600`, `text-gray-400`)

## Usage Guidelines

### Do's
✅ Use the predefined color classes from index.css  
✅ Follow the semantic color mapping (green for success, red for errors, etc.)  
✅ Maintain consistent spacing using Tailwind's spacing scale  
✅ Use transitions for interactive elements (`transition-colors duration-200`)  
✅ Apply proper contrast ratios for accessibility  
✅ Use alpha channels for overlay effects (`bg-gray-900/20`)  

### Don'ts
❌ Use bright white backgrounds (`bg-white`)  
❌ Use pure black text on dark backgrounds  
❌ Mix inconsistent border colors within a component  
❌ Use colors not defined in the design system  
❌ Forget hover and focus states for interactive elements  
❌ Use colors that don't meet accessibility contrast requirements  

## Implementation Examples

### Visualizer Component Structure
```jsx
<div className="visualizer-container">
  <h3 className="text-xl font-bold mb-4 text-default">Algorithm Name</h3>
  
  {/* Controls */}
  <div className="mb-6 space-y-4">
    <input className="input-default" />
    <button className="btn-primary">Start</button>
    <button className="btn-secondary">Reset</button>
  </div>
  
  {/* Visualization */}
  <div className="flex gap-2 mb-4">
    <div className="element-active">Active</div>
    <div className="element-inactive">Inactive</div>
  </div>
  
  {/* Status */}
  <div className="message-info">
    Algorithm status message
  </div>
  
  {/* Explanation */}
  <div className="algorithm-explanation">
    Algorithm explanation content
  </div>
</div>
```

### Color Variables for JavaScript
```javascript
const colors = {
  primary: '#22c55e',      // green-500
  secondary: '#3b82f6',    // blue-500
  tertiary: '#ea580c',     // orange-600
  success: '#16a34a',      // green-600
  warning: '#ea580c',      // orange-600
  error: '#dc2626',        // red-600
  info: '#0ea5e9',         // sky-500
  
  background: {
    primary: '#121418',    // bg-default
    secondary: '#1F202A',  // layout-default-bg
    tertiary: '#2a2b38'    // hover state
  },
  
  text: {
    primary: '#ffffff',    // white
    secondary: '#c9c9cf',  // light gray
    muted: '#71727A'       // muted gray
  },
  
  border: {
    default: '#374151',    // gray-700
    light: '#4b5563',      // gray-600
    accent: '#22c55e'      // green-500
  }
};
```

## Migration Guide

When updating existing components to follow this design system:

1. Replace `bg-white` with `bg-gray-800/50` or appropriate dark background
2. Replace `text-gray-900` with `text-default` or `text-gray-300`
3. Replace `border-gray-300` with `border-gray-700` or `border-gray-600`
4. Add proper hover and focus states using the defined classes
5. Ensure proper contrast ratios are maintained
6. Use semantic color mapping for different element states

## Accessibility Considerations

- Maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Provide alternative indicators beyond color (icons, patterns, labels)
- Ensure interactive elements have proper focus indicators
- Test with screen readers and keyboard navigation
- Use semantic HTML elements with proper ARIA labels

---

*This design system ensures consistency across all DSA-CO components while maintaining excellent dark mode aesthetics and accessibility standards.*
