import React, { createContext, useContext, ReactNode } from 'react';
import useFormContext from '../hooks/useFormContext';

const FormContext = createContext<ReturnType<typeof useFormContext> | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const form = useFormContext({
    username: '',
    email: '',
    password: '',
    reenterPassword: '',
    radio: '',
    checkboxes: [] as string[],
    age: 0,
    satisfaction: 50,
    comments: '',
    selectOption: '',
    files: null,
  });

  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};