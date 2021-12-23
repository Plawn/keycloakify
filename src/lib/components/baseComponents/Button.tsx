import { useCssAndCx } from "tss-react";
import type { KcProps } from "../KcProps";

export type ButtonProps = {
    disabled?: boolean;
    name: string;
    value: string;
    id?: string;
    tabIndex: number;
} & { kcProps: KcProps };

export default function BaseButton(props: ButtonProps) {
    const { kcProps, disabled, name, value, id, tabIndex } = props;
    const { cx } = useCssAndCx();

    return (
        <input
            tabIndex={tabIndex}
            className={cx(
                kcProps.kcButtonClass,
                kcProps.kcButtonPrimaryClass,
                kcProps.kcButtonBlockClass,
                kcProps.kcButtonLargeClass,
            )}
            name={name}
            id={id}
            type="submit"
            value={value}
            disabled={disabled}
        />
    )
}