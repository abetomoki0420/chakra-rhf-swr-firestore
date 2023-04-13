import { forwardRef} from "react"
import { Input, InputProps } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {} & InputProps

export const MyInput = (props: Props) => {
  return <Input {...props} />;
};

export const MyInputForwardRef = forwardRef<HTMLInputElement, Props & UseFormRegisterReturn>((props, ref) => {
  return <Input {...props} ref={ref} />;
});