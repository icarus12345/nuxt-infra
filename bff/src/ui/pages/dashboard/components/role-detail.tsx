import { FC, FormEventHandler, useRef, useState } from "react";
import { AlertDialog, Button, Checkbox, Flex, IconButton, TextField } from "@radix-ui/themes";
import { IUserAttribute, IRole, IRoleAttribute, IPermission } from "@entities";
import { RoleRepository } from "@repositories";
import { useToast } from '@ui/store'
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from "yup";
import * as Label from "@radix-ui/react-label";
import { PermissionAdapter } from "@/ui/adapter";
import * as CRUD from '@ui/components/crud';
import { Cross2Icon } from "@radix-ui/react-icons";

export interface IRoleDetailProps {
  data?: IRole,
  callback?: () => void
}

const RoleDetail: FC<IRoleDetailProps> = ({ data, callback }: IRoleDetailProps) => {
  const Toaster = useToast()
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);

  const formData: {attributes: IRoleAttribute, permissions: IPermission[]} = {
    attributes: {
      name: data?.attributes.name || '',
      guardName: data?.attributes.guardName || '',
    },
    permissions: data?.relationships?.permissions?.data || []
  }

  const formSchema = Yup.object().shape({
    attributes: Yup.object({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
      guardName: Yup.string()
        .required('Required'),
    }),
    permissions: Yup.array()
  });

  const onSubmit = async (formValue: {attributes: IRoleAttribute, permissions: IPermission[]}) => {
    setLoading(true)
    const onSaveSuccess = (role: IRole) => {
      closeRef.current?.click()
      if (callback) callback()
      Toaster.alert({
        type: 'success',
        title: 'Successfully!',
        message: 'Successfully Create/Update entity'
      });
    }
    RoleRepository
      .save({
        id: data?.id,
        type: 'roles',
        attributes: formValue.attributes,
        relationships: {
          permissions: {
            data: formValue.permissions
          }
        }
      })
      .then(onSaveSuccess)
      .finally(() => setLoading(false))

  };
  return (
    <AlertDialog.Content size="1">
      <AlertDialog.Title>{ data?.id ? 'Edit Role' : 'New a Role'}</AlertDialog.Title>
      <Formik
        initialValues={formData}
        validationSchema={formSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, validateField, setFieldTouched }) => (
          <Form className="grid gap-2">
            <Flex justify="between">
              <Label.Root htmlFor="attributes.name">Name</Label.Root>
              <ErrorMessage component="div" className="FormMessage" name="attributes.name" />
            </Flex>
            <Field name="attributes.name">
              {({field}: FieldProps) => (
                <TextField.Root type="text" {...field} id="attributes.name"/>
              )}
            </Field>
            
            <Flex justify="between">
              <Label.Root htmlFor="attributes.guardName">Guard</Label.Root>
              <ErrorMessage component="div" className="FormMessage" name="attributes.guardName" />
            </Flex>
            <Field name="attributes.guardName">
              {({field}: FieldProps) => (
                <TextField.Root type="text" {...field} />
              )}
            </Field>

            <Flex justify="between">
              <Label.Root htmlFor="permissions">Permission</Label.Root>
              <ErrorMessage component="div" className="FormMessage" name="permissions" />
            </Flex>
            <Field name="permissions">
              {(fieldProps: FieldProps) => (
                <>
                  <CRUD.PopoverDropdown
                    adapter={PermissionAdapter}
                    {...fieldProps}
                    />
                </>
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

export default RoleDetail;