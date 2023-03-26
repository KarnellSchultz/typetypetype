
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import '../styles/globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body>{children}</body>
            </ClerkProvider>
        </html>
    );
}

export const metadata = {
    title: 'Home',
    description: 'typetypetype is a typing game',
};
