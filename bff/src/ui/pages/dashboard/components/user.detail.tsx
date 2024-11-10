import { FC, FormEventHandler, useRef, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Checkbox, Flex, IconButton, TextField } from "@radix-ui/themes";
import { IUserAttribute, IUser, IRole } from "@entities";
import { UserRepository } from "@repositories";
import { useToast } from '@ui/store'
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from "yup";
import * as Label from "@radix-ui/react-label";
import { RoleAdapter } from "@/ui/adapter";
import * as CRUD from '@ui/components/crud';

export interface IDetailDialogProps {
  data?: IUser,
  callback?: () => void
}

const UserDetail: FC<IDetailDialogProps> = ({ data, callback }: IDetailDialogProps) => {
  const Toaster = useToast()
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);

  const formData: {attributes: IUserAttribute, roles: IRole[]} = {
    attributes: {
      name: data?.attributes.name || '',
      email: data?.attributes.email || '',
      active: data?.attributes.active || false,
    },
    roles: data?.relationships?.roles?.data || []
  }

  const formSchema = Yup.object({
    attributes: Yup.object({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    }),
    roles: Yup.array()
  });

  const onSubmit = async (formValue: {attributes: IUserAttribute, roles: IRole[]}) => {
    setLoading(true)
    const onSaveSuccess = (user: IUser) => {
      closeRef.current?.click()
      if (callback) callback()
      Toaster.alert({
        type: 'success',
        title: 'Successfully!',
        message: 'Successfully Create/Update entity'
      });
    }
    UserRepository
      .save({
        id: data?.id,
        type: 'users',
        attributes: formValue.attributes,
        relationships: {
          roles: {
            data: formValue.roles
          }
        }
      })
      .then(onSaveSuccess)
      .finally(() => setLoading(false))
  };
  return (
    <AlertDialog.Content size="1">
      <AlertDialog.Title>{ data?.id ? 'Edit Member' : 'New a Member'}</AlertDialog.Title>
      <Formik
        initialValues={formData}
        validationSchema={formSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, validateField, setFieldTouched }) => (
          <Form className="grid gap-2">
            <Flex justify="between">
              <Label.Root htmlFor="attributes.name">First Name</Label.Root>
              <ErrorMessage component="div" className="FormMessage" name="attributes.name" />
            </Flex>
            <Field name="attributes.name">
              {({field}: FieldProps) => (
                <TextField.Root type="text" {...field} id="attributes.name"/>
              )}
            </Field>
            
            <Flex justify="between">
              <Label.Root htmlFor="attributes.email">Email</Label.Root>
              <ErrorMessage component="div" className="FormMessage" name="attributes.email" />
            </Flex>
            <Field name="attributes.email">
              {({field}: FieldProps) => (
                <TextField.Root type="email" {...field} id="attributes.email"/>
              )}
            </Field>

            <Flex justify="between">
              <Label.Root htmlFor="roles">Roles</Label.Root>
              <ErrorMessage component="div" className="FormMessage" name="roles" />
            </Flex>
            <Field name="roles">
              {(fieldProps: FieldProps) => (
                <>
                  <CRUD.PopoverDropdown
                    adapter={RoleAdapter}
                    {...fieldProps}
                    />
                </>
              )}
            </Field>

            <Label.Root htmlFor="attributes.active">Active</Label.Root>
            <Field name="active">
              {({field, form, meta}: FieldProps) => (
              <Checkbox defaultChecked={data?.attributes.active} {...field} onCheckedChange={(value) => setFieldValue(field.name, value)} />
              )}
            </Field>
            <Flex justify="between" mt="3">  
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray" ref={closeRef}>
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <Button variant="soft" color="green" loading={loading}>Done</Button>
            </Flex>
          </Form>
        )}
      </Formik>
      <AlertDialog.Cancel>
        <IconButton aria-label="Close" variant="ghost" className="rt-BaseDialog-Close" color="gray">
          <Cross2Icon />
        </IconButton>
      </AlertDialog.Cancel>
    </AlertDialog.Content>
  )
}

export default UserDetail;