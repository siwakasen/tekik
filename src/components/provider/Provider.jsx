
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

export default function provider({ children }) {
    // 2. Wrap NextUIProvider at the root of your app
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}
