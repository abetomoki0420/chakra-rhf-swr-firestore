import { collection, query, where, getDocs, setDoc, doc} from "firebase/firestore"
import { db } from "@/firebase"
import useSWR from "swr"
import { useState } from "react"

export type Fluit = {
  name: string
  price: number
}

const fluits: Fluit[] = [
  {
    name: "apple",
    price: 100
  },
  {
    name: "banana",
    price: 150
  },
  {
    name: "orange",
    price: 200
  }
]

// set test data
fluits.forEach( async ({name, price}) => {
  await setDoc(doc(db, "fluits", name),{
    name,
    price
  })
})

const fetcher = async ({ params }: { params: number }) => {
  const collectionRef = collection(db, "fluits")
  const q = query(collectionRef, where("price", "<=", params))
  const querySnapshot = await getDocs(q)

  let fluits: Fluit[] = []
  querySnapshot.forEach((doc) => {
    fluits.push(doc.data() as Fluit)
  })

  return fluits
}

export const useFluits = () => {
  const [params, setParams] = useState<number>(150)

  const { data, error, isLoading, isValidating } = useSWR({ key: "fluits", params }, fetcher)
  
  return {
    data,
    error,
    isLoading,
    isValidating,
    params,
    setParams,
  }
}
