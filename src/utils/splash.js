// Resolves when the opening splash screen starts to fade, so heavy work such as building the
// 3D scenes waits until the splash has had the main thread to itself. Falls back after 3 s.
let resolveSplash;
export const splashDone = new Promise((resolve) => {
    resolveSplash = resolve;
    setTimeout(resolve, 3000);
});
export const markSplashDone = () => resolveSplash();
