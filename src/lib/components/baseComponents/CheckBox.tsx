
export type CheckBoxProps = {
    id?: string;
    tabIndex: number;
    content: JSX.Element;
    checked?: boolean;
    name: string;
}


export default function BaseCheckBox(props: CheckBoxProps) {

    const { checked, content, name, tabIndex, id } = props;


    return (
        <label>
            <input
                id={id}
                tabIndex={tabIndex}
                name={name}
                type="checkbox"
                checked={checked}
            />
            {content}
        </label>
    )
}