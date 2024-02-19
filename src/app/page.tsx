"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Dialogs from "@/components/dialogs";
import Div100vh from "@/components/Div100vh";
import Interface from "@/components/Interface";
import { StringProvider } from "@/lib/contexts/useStrings";

const queryClient = new QueryClient();

const Page = () => (
  <QueryClientProvider client={queryClient}>
    <StringProvider>
      <Div100vh>
        <Dialogs />
        <Interface />
      </Div100vh>
    </StringProvider>
  </QueryClientProvider>
);

export default Page;
