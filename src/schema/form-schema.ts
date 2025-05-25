import { z } from "zod"

const registrationFormSchema = z.object({
	lagnamn: z.string().min(1, "Lagnamn krävs"),
	klass: z.string().min(1, "Klass krävs"),
	spelare: z.array(z.object({
		namn: z.string().min(1, "Spelarnamn krävs"),
		disc: z.string().min(1, "Ingen bra disk!"),
	})).min(1, "Minst en spelare krävs"),
	kontaktperson: z.string().min(1, "kontaktperson krävs"),
	hemmabana: z.string().min(1, "Hemmabana krävs"),
	besoksadress: z.string().min(1, "Besöksadress krävs"),
	postnummer: z.string().min(1, "Postnummer krävs").regex(/^\d{5}$/, "Ogiltigt postnummer"),
	ort: z.string().min(1, "Ort krävs"),
	land: z.string().min(1, "Land krävs"),
	telefon: z.string().min(1, "Telefon krävs").regex(/^\+?[0-9\- ]{7,}$/, "Ogiltigt telefonnummer"),
	email: z.string().email("Ogiltig e-postadress"),
	password: z.string().min(6, "Lösenordet måste vara minst 6 tecken"),
});

export { registrationFormSchema }