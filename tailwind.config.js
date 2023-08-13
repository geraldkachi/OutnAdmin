module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                "primary": "var(--ion-color-primary)",
                "primary-shade": "var(--ion-color-primary-shade)",
                "primary-tint": "var(--ion-color-primary-tint)",
                "secondary": "var(--ion-color-secondary)",
                "tertiary": "var(--ion-color-tertiary)",
                "warning": "var(--ion-color-warning)",
                "warning-shade": "var(--ion-color-warning-shade)",
                "danger": "var(--ion-color-danger)",
                "success": "var(--ion-color-success)",
                "success-light": "var(--ion-color-success-light)",
                "medium": "var(--ion-color-medium)",
                "medium-shade": "var(--ion-color-medium-shade)",
                "medium-tint": "var(--ion-color-medium-tint)",
                "light": "var(--ion-color-light)",
                "dark": "var(--ion-color-dark)",
                "dark-shade": "var(--ion-color-dark-shade)",
                "dark-tint": "var(--ion-color-dark-tint)",
                "shade": "var(--ion-background-shade)"
            }
        }
    },
    plugins: [],
};
