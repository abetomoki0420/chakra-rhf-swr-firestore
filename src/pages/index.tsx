import { MyInput } from "@/components/MyInput"
import { useFluits } from "@/hooks/useFluits"
import {
  Button,
  FormControl,
  FormLabel,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export default function Home() {
  const { data, setParams, params, isLoading } = useFluits()

  const { handleSubmit, register } = useForm<{ price: number }>({
    defaultValues: {
      price: params,
    },
  })

  const onSubmit = ({ price }: { price: number }) => {
    setParams(price)
  }

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="price">Price</FormLabel>
          <MyInput
            id="price"
            placeholder="price"
            type="number"
            min={0}
            max={300}
            {...register("price", {
              min: { value: 0, message: "min 0" },
              max: { value: 300, message: "max 300" },
              valueAsNumber: true,
            })}
          />
          <Button type="submit">submit</Button>
        </FormControl>
      </form>
      <UnorderedList>
        {data?.map((d) => {
          return (
            <ListItem key={d.name}>
              {d.name} {d.price}
            </ListItem>
          )
        })}
      </UnorderedList>
    </div>
  )
}
