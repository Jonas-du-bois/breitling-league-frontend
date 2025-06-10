# TextInput Vertical Default View - Component Guide

## 🎯 Overview

The `TextInputVertical` component has been updated to provide a clean, default view design that follows exact specifications for visual response inputs with image and text layout.

## 📐 Design Specifications

### Component Dimensions
- **Container**: 160px width × 128px height
- **Padding**: 8px internal padding
- **Border Radius**: 8px
- **Layout**: Vertical structure (image top, text below)

### Image Placeholder
- **Size**: 144px width × 96px height  
- **Position**: Top of component
- **Styling**: Rounded corners (4px), object-fit cover
- **Aspect Ratio**: 3:2 (144:96)

### Typography
- **Font Family**: Italian Plate No2
- **Font Size**: 16px base
- **Line Height**: 1.2
- **Default Weight**: 600 (semibold)
- **Variant Weights**: 500 (medium) for correct/wrong states

### Color Schemes

#### Default Variant
- Background: White (#FFFFFF)
- Border: 1px solid blue (#072C54)
- Text Color: Black (#09091A)
- Font Weight: 600 (semibold)

#### Selected Variant  
- Background: Yellow (#F6E291)
- Border: 1px solid blue (#072C54)
- Text Color: Black (#09091A)
- Font Weight: 600 (semibold)

#### Correct Answer Variant
- Background: Light green (#ECFEF2)
- Border: 1px solid green (#39A05D)
- Text Color: Green (#39A05D)
- Font Weight: 500 (medium)
- Height: 144px (extra space for points)
- Points Display: Centered at bottom

#### Wrong Answer Variant
- Background: Light red (#FFEBE9)
- Border: 1px solid red (#B9473B)
- Text Color: Red (#B9473B)
- Font Weight: 500 (medium)

## 🏗️ Component Structure

```
┌─────────────────────┐ 160px width
│  ┌───────────────┐  │
│  │  IMAGE AREA   │  │ 144px × 96px
│  │   144×96px    │  │
│  └───────────────┘  │
│                     │
│    Response Text    │ Centered text area
│                     │
│   + Points (if      │ Points (correct only)
│   correct variant)  │
└─────────────────────┘ 128px height (144px for correct)
```

## 🚀 Usage Examples

### Basic Default Component
```vue
<TextInputVertical 
  v-model="responseText" 
  placeholder="Response"
  image-url="https://example.com/image.jpg"
  @click="handleClick"
/>
```

### Selected State
```vue
<TextInputVertical 
  v-model="responseText" 
  :isSelected="true"
  image-url="https://example.com/image.jpg"
/>
```

### Correct Answer with Points
```vue
<TextInputVertical 
  v-model="responseText" 
  :isCorrectAnswer="true"
  :points="1500"
  image-url="https://example.com/image.jpg"
/>
```

### Wrong Answer
```vue
<TextInputVertical 
  v-model="responseText" 
  :isWrongAnswer="true"
  image-url="https://example.com/image.jpg"
/>
```

### Simple Text Display (No Image)
```vue
<TextInputVertical 
  v-model="responseText" 
  :showSimpleDisplay="true"
/>
```

## 📝 Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | String | `''` | The input value |
| `placeholder` | String | `'Response'` | Placeholder text |
| `imageUrl` | String | `''` | URL for the image placeholder |
| `imageAlt` | String | `'Response Image'` | Alt text for the image |
| `displayValue` | String | `''` | Override display value |
| `isCorrectAnswer` | Boolean | `false` | Show as correct answer |
| `isWrongAnswer` | Boolean | `false` | Show as wrong answer |
| `isSelected` | Boolean | `false` | Show as selected state |
| `points` | String/Number | `'1000'` | Points to display for correct answers |
| `showSimpleDisplay` | Boolean | `false` | Show text-only version without image |

## 🎮 Events

| Event | Payload | Description |
|-------|---------|-------------|
| `@click` | `modelValue` | Emitted when component is clicked |
| `@select` | `{value, isSelected}` | Emitted when component state changes |

## 🎨 Interactive Features

- **Hover Effects**: 2px outline, slight upward translation, shadow
- **Smooth Transitions**: 0.2s ease for all state changes
- **Click Feedback**: Visual feedback on user interaction
- **Responsive Design**: Mobile-friendly with breakpoint adjustments

## 🔧 Technical Implementation

### CSS Classes Structure
- `.input-wrapper`: Base container styles
- `.vertical-default`: Default variant styling
- `.vertical-selected`: Selected variant styling  
- `.vertical-correct`: Correct answer variant styling
- `.vertical-wrong`: Wrong answer variant styling
- `.image-container`: Image placeholder wrapper
- `.text-container`: Text content wrapper
- `.points-container`: Points display wrapper

### Animation Support
- Fade-in scale animation on component mount
- Hover transition effects
- Smooth state transitions

## 📱 Responsive Behavior

- **Desktop**: Fixed 160px width
- **Mobile**: 100% width with max-width: 160px
- **Image**: Responsive sizing while maintaining aspect ratio
- **Text**: Flexible wrapping and sizing

## ✅ Accessibility Features

- Proper alt text for images
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios

---

**Component Location**: `src/components/input/TextInputVertical.vue`  
**Demo**: `public/textinput-vertical-demo.html`  
**Group Component**: `src/components/input/TextInputVerticalGroup.vue`
