import { useCssAndCx } from "tss-react";
import type { KcProps } from "../KcProps";
import { useUID } from 'react-uid';

export type TextInputFieldProps = {
    id?: string;
    label: string | JSX.Element;
    tabIndex: number;
    disabled?: boolean;
    defaultValue?: string;
    autoFocus?: boolean;
    autoComplete?: string;
    name: string;
    type: "text" | "password";
} & { kcProps: KcProps };


export default function BaseTextInputField(props: TextInputFieldProps) {
    const { label, kcProps, id, ...rest } = props;
    const { cx } = useCssAndCx();
    const uid = useUID();
    return (
        <>
            <label htmlFor={id || uid} className={cx(kcProps.kcLabelClass)}>
                {label}
            </label>
            <input
                id={id || uid}
                className={cx(kcProps.kcInputClass)}
                {...rest}
            />
        </>
    )
}