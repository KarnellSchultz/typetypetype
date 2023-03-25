
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'


export const metadata = {
    title: 'Home',
    description: 'typetypetype is a typing game',
};



export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}