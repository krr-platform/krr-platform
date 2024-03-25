import type { Metadata } from 'next';
import Head from 'next/head';
import '@/app/ui/global.css';
import { inter } from './ui/fonts';

export const metadata: Metadata = {
    title: 'KRR Platform',
    description: 'Platform to educate on artificial intelligence topics.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
}
