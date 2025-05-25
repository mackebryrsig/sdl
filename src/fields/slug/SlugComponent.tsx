"use client"

import React, { useCallback, useEffect } from "react"
import { TextFieldClientProps } from "payload"

import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from "@payloadcms/ui"

import { formatSlug } from "./formatSlug"

type SlugComponentProps = {
	fieldToUse: string
	checkboxFieldPath: string
} & TextFieldClientProps

const SlugComponent: React.FC<SlugComponentProps> = ({
	field,
	fieldToUse,
	checkboxFieldPath: checkboxFieldPathFromProps,
	path,
	readOnly: readOnlyFromProps
}) => {
	const { label } = field;

	const checkboxFieldPath = path?.includes(".")
		? `${path}.${checkboxFieldPathFromProps}`
		: checkboxFieldPathFromProps;

	const { value, setValue } = useField<string>({ path: path || field.name });

	const { dispatchFields } = useForm();

	const checkboxValue = useFormFields(([fields]) => {
		return fields[fieldToUse]?.value as string
	});

	const targetFieldValue = useFormFields(([fields]) => {
		return fields[fieldToUse]?.value as string
	});


	useEffect(() => {
		if(checkboxValue) {
			if(targetFieldValue) {
				const formattedSlug = formatSlug(targetFieldValue);

				if(value !== formattedSlug) setValue(formattedSlug);
			} else {
				if(value !== "") setValue("");
			}
		}
	}, [targetFieldValue, checkboxValue, setValue, value]);


	const handleLock = useCallback(
		(e: React.MouseEvent<Element>) => {
			e.preventDefault();

			dispatchFields({
				type: "UPDATE",
				path: checkboxFieldPath,
				value: !checkboxValue
			})
		},
		[checkboxValue, checkboxFieldPath, dispatchFields]
	);

	const readOnly = readOnlyFromProps || checkboxValue;

	return(
		<div>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<FieldLabel htmlFor={`field-${path}`} label={label} />
				<Button buttonStyle="none" onClick={handleLock}>
					{ checkboxValue ? "Unlock" : "Lock" }
				</Button>
			</div>

			<TextInput
				value={value}
				onChange={setValue}
				path={path || field.name}
				readOnly={Boolean(readOnly)}
			/>
		</div>
	)
}

export { SlugComponent }