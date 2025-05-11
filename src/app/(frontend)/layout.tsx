import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Navigation from '@/components/header/navigation '

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="sv" suppressHydrationWarning>
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
