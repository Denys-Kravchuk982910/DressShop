import './field.scss';

interface FieldType {
    placeholder: string;
    name: string;
    type?: string;
    value: string;
    setValue: (arg: string) => void;
}

export const Field: React.FC<FieldType> = ({ placeholder, name, type = 'text', value, setValue }) => {
    return (<div className="fieldCustom">
        <label htmlFor={name} className='fieldCustom__form-label'>{placeholder}</label>

        <input
            type={type}
            placeholder={placeholder}
            id={name}
            name={name}
            className='fieldCustom__form-input'
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    </div>);
}