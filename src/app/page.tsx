import React from "react";

import Dialogs from "@/components/dialogs";
import Div100vh from "@/components/Div100vh";
import Interface from "@/components/Interface";
import { StringProvider } from "@/lib/contexts/useStrings";

const Page = () => (
  <StringProvider>
    <Div100vh>
      <Dialogs />
      <Interface />
    </Div100vh>
  </StringProvider>
);

export default Page;
