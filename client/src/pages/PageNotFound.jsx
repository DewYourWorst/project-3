import {useParams} from "react-router-dom"
export default function PageNotFound(props){

  const { id } = useParams()

  console.log(id)


  return(
    <>
    <h1>no page with this name</h1>
    <h2>{id}</h2>
    </>
  )
}