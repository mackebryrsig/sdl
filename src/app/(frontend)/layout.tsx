import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Navigation from '@/components/header/navigation '

import { Poppins } from 'next/font/google'

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
      <body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<Navigation />
        	{ children }
				</ThemeProvider>
      </body>
    </html>
  )
}
