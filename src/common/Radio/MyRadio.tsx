import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const MyRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        className,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeOption && onChangeOption(e.currentTarget.value)
        // onChange, onChangeOption

    }

    const finalInputClass = `${s.inputClass} + ${className}`


    const mappedOptions: InputHTMLAttributes<string>[] = options ? options.map((o, i) => (
        <label key={name + '-' + i}>
            <input
                className={finalInputClass}
                type={'radio'}
                checked={value === o}
                name={name}
                value={o}
                onChange={onChangeCallback}
                // name, checked, value, onChange
            />
            {o}
        </label>
    )) : []

    return (
        <div className={s.container}>
            {mappedOptions}
        </div>
    )
}

export default MyRadio
