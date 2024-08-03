import './styles/field.scss';

export interface FieldType {
    label: string;
    name: string;
    value: string;
    setValue: (prop: string) => void;
    type?: string;
}

const Field : React.FC<FieldType> = ({ label, name, value, setValue, type = 'text' }) => {    
    return (<div className="field">
        <label htmlFor={name}>{label}</label>

        <input
            className="field__modal-input"
            name={name}
            type={type}
            id={name}
            placeholder={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>)
}

export default Field;