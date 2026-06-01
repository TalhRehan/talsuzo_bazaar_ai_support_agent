import { PropagateLoader } from "react-spinners"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader color="#0aad0a" size={8} />
    </div>
  )
}
