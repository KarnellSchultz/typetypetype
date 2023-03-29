
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
                <body className="w-4/5 mx-auto max-w-xl" >{children}</body>
            </ClerkProvider>
        </html>
    );
}

export const metadata = {
    title: 'Home',
    description: 'typetypetype is a typing game',
};
