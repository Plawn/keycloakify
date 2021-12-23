import { ReactNode } from "react";
import type { KcProps } from "../KcProps";
import { useCssAndCx } from "tss-react";

export type CardProps = {
    children?: ReactNode;
    displayWide: boolean;
} & { kcProps: KcProps };

export default function BaseCard(props: CardProps) {
    const { cx } = useCssAndCx();
    const { children, kcProps, displayWide } = props;

    return (
        <div className={cx(kcProps.kcFormCardClass, displayWide && kcProps.kcFormCardAccountClass)}>
            {children}
        </div>
    )
}