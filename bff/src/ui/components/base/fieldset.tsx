import { FC, Fragment, ReactNode } from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';

interface FieldsetProps extends FieldProps {
  name: string;
  label: string;
  children: (props: FieldProps) => ReactNode;
}

const Fieldset: FC<FieldsetProps> = ({ name, label, children, ...rest }) => (
  <Fragment>
    <label htmlFor={name}>{label}</label>
    { children ? (
      <Field id={name} name={name} {...rest}>
      {(fieldProps: FieldProps) => children(fieldProps)}
      </Field>
    ) : (
      <Field id={name} name={name} {...rest} />
    )}
    <ErrorMessage name={name} component="div" />
  </Fragment>
);

export default Fieldset;