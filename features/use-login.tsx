"use client";


import { useRouter } from 'next/navigation';

import {
    useMutation,
    QueryClient
} from '@tanstack/react-query';

import { login } from '@/actions/login';

import { toast } from "sonner";

export const useLogin = () => {
    const queryClient = new QueryClient();

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: login,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {

            if (data?.success) {
                toast.success(data.success);
                router.push("/auth/login")
            }

            if (data?.error) {
                toast.error(data.error)
            }

            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    return mutation;
}