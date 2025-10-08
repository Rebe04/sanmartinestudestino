import React from 'react';
import Creatable from 'react-select/creatable';

// Este componente es un selector que permite crear nuevas opciones
export default function CreatableSelect({ options, value, onChange, placeholder, error }) {

    // Transforma las opciones que vienen de Laravel al formato que react-select espera: { value, label }
    const formattedOptions = options.map(option => ({
        value: option.id,
        label: option.name
    }));

    // Encuentra el objeto de opción correspondiente al valor actual
    const selectedValue = formattedOptions.find(option => option.value === value);

    // Función que se ejecuta cuando se cambia el valor o se crea una nueva opción
    const handleChange = (selectedOption) => {
        if (selectedOption.__isNew__) {
            // Si es una nueva opción, pasamos el objeto { isNew: true, value: 'texto escrito' }
            onChange({ isNew: true, value: selectedOption.value });
        } else {
            // Si es una opción existente, pasamos el objeto { isNew: false, value: ID_de_la_opcion }
            onChange({ isNew: false, value: selectedOption.value });
        }
    };

    return (
        <div>
            <Creatable
                options={formattedOptions}
                value={selectedValue}
                onChange={handleChange}
                placeholder={placeholder}
                formatCreateLabel={inputValue => `Crear "${inputValue}"`}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: error ? 'rgb(220 38 38)' : state.isFocused ? 'rgb(34 197 94)' : 'rgb(209 213 219)',
                        boxShadow: state.isFocused ? '0 0 0 1px rgb(34 197 94)' : 'none',
                        '&:hover': {
                            borderColor: state.isFocused ? 'rgb(34 197 94)' : 'rgb(156 163 175)',
                        }
                    }),
                }}
            />
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    );
}
