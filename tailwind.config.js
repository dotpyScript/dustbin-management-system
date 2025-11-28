export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core Foundation Colors
        background: '#151a29', // Main page background (darkest)
        surface: '#2a2a40', // Cards, panels, elevated surfaces
        input: '#2f2f45', // Input fields, text areas
        hover: '#32324a', // Hover state for interactive elements
        border: '#374151', // Borders, dividers, subtle lines

        // Text Colors
        text: '#e2e8f0', // Primary text (slate-200)
        textSecondary: '#cbd5e1', // Secondary text (slate-300)
        textTertiary: '#94a3b8', // Tertiary text (slate-400)
        muted: '#9ca3af', // Disabled, muted text (gray-400)
        mutedLight: '#6b7280', // Even lighter muted (gray-500)

        // Primary Actions (Blue - Your current accent)
        accent: '#60a5fa', // Primary accent/link color
        accentHover: '#3b82f6', // Darker blue on hover
        accentActive: '#1e40af', // Darkest blue when active
        accentLight: '#93c5fd', // Light blue for backgrounds
        accentBg: '#0f172a', // Very dark blue background

        // Success States (Green)
        success: '#10b981', // Success, completed, available
        successHover: '#059669', // Darker green on hover
        successLight: '#d1fae5', // Light green background
        successBg: '#064e3b', // Dark green background

        // Warning States (Amber/Orange)
        warning: '#f59e0b', // Warning, pending, caution
        warningHover: '#d97706', // Darker orange on hover
        warningLight: '#fef3c7', // Light amber background
        warningBg: '#78350f', // Dark amber background

        // Error States (Red)
        error: '#ef4444', // Error, critical, delete
        errorHover: '#dc2626', // Darker red on hover
        errorLight: '#fee2e2', // Light red background
        errorBg: '#7f1d1d', // Dark red background

        // Info States (Cyan)
        info: '#06b6d4', // Info, notification, message
        infoHover: '#0891b2', // Darker cyan on hover
        infoLight: '#cffafe', // Light cyan background
        infoBg: '#164e63', // Dark cyan background

        // Interactive States
        buttonPrimary: '#60a5fa', // Primary button (same as accent)
        buttonPrimaryHover: '#3b82f6',
        buttonSecondary: '#32324a', // Secondary button (matches hover)
        buttonSecondaryHover: '#3f3f57',
        buttonGhost: 'transparent', // Ghost/text button background

        // UI Elements
        disabled: '#6b7280', // Disabled state text
        disabledBg: '#1f2937', // Disabled state background
        divider: '#374151', // Same as border for consistency
        shadow: 'rgba(0, 0, 0, 0.5)',

        // Subtle Colors (for backgrounds, badges, tags)
        subtle: '#1f2937', // Subtle background
        subtleText: '#d1d5db', // Text on subtle background

        // Active/Focus States
        active: '#60a5fa', // Active element (matches accent)
        focus: '#93c5fd', // Focus ring color (light blue)
        focusRing: '2px solid #60a5fa', // Can be used in custom styles

        // Brand/Primary Colors
        primary: '#60a5fa', // Your main brand color
        primaryDark: '#1e40af',
        primaryLight: '#93c5fd',
      },
    },
  },
  plugins: [],
};
