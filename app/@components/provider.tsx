'use client';

import {useQuery,useMutation,useQueryClient,QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient()

export default function Provider({children} : {children : ReactNode}) {
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                {children}
            </RecoilRoot>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}