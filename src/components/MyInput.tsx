import { forwardRef} from "react"
import { Input, InputProps } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {} & InputProps & Omit<UseFormRegisterReturn, "ref">;

export const MyInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <Input {...props} ref={ref} />;
});