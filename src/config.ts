const config = {
    // baseUrl:"https://app.getoutnabout.co.uk",
    baseUrl:process.env.NEXT_PUBLIC_BASE_URL,
};
// const config = env.dev;
export const KEY=Math.random().toString(36).substring(2,20)
export const FONT_NAME = "Kodchasan"
export const DOMAIN = "https://app.getoutnabout.co.uk"
export default config;
