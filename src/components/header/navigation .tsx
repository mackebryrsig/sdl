import DiscgolfBasket from "@/icons/discgolf-basket"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "../ui/button"
import { ModeToggle } from "./mode-toggle"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import RegistrationForm from "../forms/registration-form"

type MenuItem = {
	title: string;
	href: string;
	description: string;
}

const InfoItems: MenuItem[] = [
	{ title: "Tävlingsinformation", href: "/tavlingsinformation", description: "Information om tävlingen" },
	// { title: "Karta", href: "/karta", description: "Se alla platser där SDL spelas." },
	// { title: "Nyheter", href: "/nyheter", description: "Nyheter kopplade till tävlingen" },
	{ title: "Regler", href: "/regler", description: "Regler om tävlingen" },
];

const MatchItems: MenuItem[] = [
	{ title: "Samtliga matcher", href: "/matcher", description: "Se alla matcher" },
	{ title: "Bokade matcher", href: "/matcher", description: "Se alla matcher" },
	{ title: "Ospelade matcher", href: "/matcher", description: "Se alla matcher" },
	{ title: "Senaste resultat", href: "/matcher", description: "Se alla matcher" },
];

const StatisticsItem: MenuItem[] = [
	{ title: "Lagstatistik", href: "/lagstatistik", description: "Se statistik för alla lagen i ligan" },
	{ title: "Spelarstatistik", href: "/spelarstatistik", description: "Se statistik för spelare i lagen" },
];

const Navigation = () => {
	return(
		<nav className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 shadow-sm">
			<Link href="/" className="text-foreground flex items-center gap-2">
				<DiscgolfBasket className="text-foreground w-8 h-8" />
				<span className="font-semibold text-sm">Svenska Dubbeldisc Ligan</span>
			</Link>

			<NavigationMenu>
				<NavigationMenuList>

					<NavigationMenuItem>
						<NavigationMenuTrigger>Info</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{InfoItems.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

					<NavigationMenuItem>

							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link href="/lag">
									Lag
								</Link>
							</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
							<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
								<Link href="/klasser">
									Klasser
								</Link>
							</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuTrigger>Matcher</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{MatchItems.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuTrigger>Statistik</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								{StatisticsItem.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>


				</NavigationMenuList>
			</NavigationMenu>

			<div className="flex items-center gap-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="default">Anmälan</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-3xl">
						<DialogHeader>
							<DialogTitle>Anmälan Svenska DoubleDisc Ligan</DialogTitle>
							<DialogDescription>
								Sista anmälningsdag: 2025-03-10
							</DialogDescription>
						</DialogHeader>

						<RegistrationForm />

					</DialogContent>
				</Dialog>

				<Button variant="secondary">Logga in</Button>
				<ModeToggle />
			</div>

		</nav>
	)
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Navigation