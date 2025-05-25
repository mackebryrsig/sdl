import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Navigation from '@/components/header/navigation '

import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
	weight: ["400", "600", "700"]
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="sv" className={poppins.className} suppressHydrationWarning>
      <body className="flex flex-col justify-between min-h-dvh">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<Navigation />
					<main className="pt-16">
        		{ children }
					</main>
					<Footer />
				</ThemeProvider>
      </body>
    </html>
  )
}
