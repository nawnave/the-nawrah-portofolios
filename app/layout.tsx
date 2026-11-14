import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Nawrah Qanita Irfan — Portfolio', description: 'Business strategy, brand growth, and the work behind the ideas.' };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
