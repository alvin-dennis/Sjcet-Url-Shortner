const FormField = ({
     label,
     type = 'text',
     name,
     value,
     onChange,
     placeholder,
     required = false,
     options = null,
     pattern = null,
     maxLength = null,
     title = null
}) => {
     if (type === 'select') {
          return (
               <div className="form-field">
                    <label htmlFor={name}>{label}</label>
                    <select
                         id={name}
                         name={name}
                         value={value}
                         onChange={onChange}
                         required={required}
                    >
                         {options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                   {option.label}
                              </option>
                         ))}
                    </select>
               </div>
          );
     }

     return (
          <div className="form-field">
               <label htmlFor={name}>{label}</label>
               <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    pattern={pattern}
                    maxLength={maxLength}
                    title={title}
               />
          </div>
     );
};

export default FormField;