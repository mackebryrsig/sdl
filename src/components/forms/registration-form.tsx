"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"

import { registrationFormSchema } from "@/schema/form-schema"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const RegistrationForm = () => {
	const form = useForm<z.infer<typeof registrationFormSchema>>({
		resolver: zodResolver(registrationFormSchema),
		defaultValues: {
			lagnamn: "",
			klass: "",
			spelare: [{ namn: "", disc: "" }],
			hemmabana: "",
			besoksadress: "",
			postnummer: "",
			ort: "",
			land: "",
			telefon: "",
			email: "",
			password: "",
			kontaktperson: ""
		}
	})

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "spelare"
  })

	const onSubmit = (values: z.infer<typeof registrationFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

	return(
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap flex-row">
				<FormField
          control={form.control}
          name="lagnamn"
          render={({ field }) => (
            <FormItem className="basis-2/3 w-full p-2">
              <FormLabel>Lagnamn</FormLabel>
              <FormControl>
                <Input placeholder="Lagnamn" {...field} />
              </FormControl>
              <FormDescription>
                Välj erat lagnamn, behåll gärna samma om ni varit med fler säsonger.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

				<FormField
          control={form.control}
          name="klass"
          render={({ field }) => (
            <FormItem className="basis-1/3 w-full p-2">
              <FormLabel>Välj Klass</FormLabel>
              <FormControl>
								<Select {...field}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Välj Klass" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="sto_2">STO_2: Division 2 Stockholm</SelectItem>
										<SelectItem value="sto_3">STO_3: Division 3 Stockholm</SelectItem>
									</SelectContent>
								</Select>

              </FormControl>
              <FormDescription>
                Vilken klass spelar ni i?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


				{/* Spelare */}
        <div className="w-full p-2">
          <h3 className="font-bold mb-2">Spelare</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2 items-end">
              <FormField
                control={form.control}
                name={`spelare.${index}.namn`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Namn</FormLabel> }
                    <FormControl>
                      <Input placeholder="Spelarnamn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`spelare.${index}.disc`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Favorit disk</FormLabel> }
                    <FormControl>
                      <Input placeholder="Favorit disk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                Ta bort
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({ namn: "", disc: "" })}>
            Lägg till spelare
          </Button>
        </div>
				{/* Spelare ends */}


				<FormField
          control={form.control}
          name="kontaktperson"
          render={({ field }) => (
            <FormItem className="w-2/4 p-2">
              <FormLabel>Kontaktperson</FormLabel>
              <FormControl>
                <Input placeholder="Kontaktperson" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

				<FormField
          control={form.control}
          name="telefon"
          render={({ field }) => (
            <FormItem className="w-2/4 p-2">
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input placeholder="Telefonnummer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

				<FormField
          control={form.control}
          name="hemmabana"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel>Hemmabana</FormLabel>
              <FormControl>
                <Input placeholder="Hemmabana" {...field} />
              </FormControl>
							<FormDescription>
                Vilken bana är er hemmabana?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

				{/* Kontouppgifter */}
				<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-2/4 p-2">
              <FormLabel>E-mailaddress</FormLabel>
              <FormControl>
                <Input placeholder="E-mailaddress" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

				<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-2/4 p-2">
              <FormLabel>Bekräfta E-mailaddress</FormLabel>
              <FormControl>
                <Input placeholder="Bekräfta E-mailaddress" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

				<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-2/4 p-2">
              <FormLabel>Lösenord</FormLabel>
              <FormControl>
                <Input placeholder="Lösenord" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

				<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-2/4 p-2">
              <FormLabel>Bekräfta Lösenord</FormLabel>
              <FormControl>
                <Input placeholder="Bekräfta Lösenord" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


				<footer className="w-full p-2">
        	<Button type="submit">Registrera</Button>
				</footer>
			</form>
		</Form>
	)
}

export default RegistrationForm