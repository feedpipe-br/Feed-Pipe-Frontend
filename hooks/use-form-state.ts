import {useCallback, useState} from "react";

type InputValueType = "string" | "int" | "float" | "decimal" | "boolean";
interface InputValueTypeOpts {
    fractionDigits?: number
}

type ReturnUseFormState<T> = [Partial<T>, ((prop: keyof T, valueType?: InputValueType, opts?: InputValueTypeOpts) => (value: string) => void), ((prop: keyof T) => (value: boolean) => void), (prop: keyof T) => string]

export const useFormState = <T>(initial: Partial<T>): ReturnUseFormState<T> => {
    const [formData, setFormData] = useState<Partial<T>>(initial);
    const handleChange = useCallback((prop: keyof T, valueType: InputValueType="string", opts: InputValueTypeOpts = {}) => {
        return (value: string) => {
            let cleanedValue;
            switch (valueType) {
                case "string":
                    cleanedValue = value;
                    break;
                case "int":
                    cleanedValue = Number.parseInt(value);
                    break
                case "decimal":
                    cleanedValue = Number.parseFloat(value).toFixed(opts.fractionDigits)
                    break;
                case "float":
                    cleanedValue = Number.parseFloat(value)
                    break;
                case "boolean":
                    cleanedValue = !!value
                    break;
            }
            setFormData({ ...formData, [prop]: cleanedValue })
        }
    }, [formData])
    const handleChangeBoolean = useCallback((prop: keyof T) => {
        return (value: boolean) => {setFormData({ ...formData, [prop]: value })}
    }, [formData])
    const getInputValue = useCallback((prop: keyof T): string => {
        return formData[prop] ? String(formData[prop]): "";
    }, [formData])
    return [formData, handleChange, handleChangeBoolean, getInputValue]
}
