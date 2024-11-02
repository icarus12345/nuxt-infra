import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { $AuthRepository } from "@repositories";
import { LoginUseCase } from '@usecases';

type UseLoginForm = {
  onSubmit: (event: FormEvent) => void
  register: UseFormRegister<FormData>
  loading: boolean
};
type FormData = {
  email: string
  password: string
  rememberMe: boolean
};

export const useLoginForm = (): UseLoginForm => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    setLoading(true)
    LoginUseCase.execute(data.email, data.password, data.rememberMe)
      .then((success: boolean) => {
        if (success) {
          router.push('/');
        }
      })
      .finally(() => setLoading(false))
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    loading,
  };
};
