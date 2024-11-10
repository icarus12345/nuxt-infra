import { FC, FormEventHandler, useRef, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Checkbox, Flex, IconButton, TextField } from "@radix-ui/themes";
import { IUserAttribute, IComment, User } from "@entities";
import { CommentRepository } from "@repositories";
import { useToast } from '@ui/store'
import { Formik, Field, Form, ErrorMessage, FieldProps } from 'formik';
import * as Yup from "yup";
import * as Label from "@radix-ui/react-label";
export interface ICommentDialogProps {
  data?: IComment,
  callback?: () => void
}

const CommentDetail: FC<ICommentDialogProps> = ({ data, callback }: ICommentDialogProps) => {
  const Toaster = useToast()
  const closeRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  });

  const onSubmit = async (formValue: Partial<IUserAttribute>) => {
    setLoading(true)
    const onSaveSuccess = (role: IComment) => {
      closeRef.current?.click()
      if (callback) callback()
      Toaster.alert({
        type: 'success',
        title: 'Successfully!',
        message: 'Successfully Create/Update entity'
      });
    }
    if (data?.id) {
      CommentRepository.patch(data.id, formValue)
      .then(onSaveSuccess)
      .finally(() => setLoading(false))
    } else {
      CommentRepository.post(formValue)
      .then(onSaveSuccess)
      .finally(() => setLoading(false))
    }
    
  };
  return (
      <AlertDialog.Content size="1">
        <AlertDialog.Title>{  data?.id ? 'Edit Comment' : 'New a Comment'}</AlertDialog.Title>
        <Formik
          initialValues={{
            name: data?.attributes.name,
          }}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, validateField, setFieldTouched }) => (
            <Form className="grid gap-2">
              <Flex justify="between">
                <Label.Root htmlFor="name">Name</Label.Root>
                <ErrorMessage component="div" className="FormMessage" name="name" />
              </Flex>
              <Field name="name">
                {({field}: FieldProps) => (
                  <TextField.Root type="text" {...field} id="name"/>
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
};

export default CommentDetail;