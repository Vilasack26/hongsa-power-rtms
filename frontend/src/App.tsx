import { AppRouter } from "./routes"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="App">
      <AppRouter />
      <Toaster /> // position ของ toast notification ใส่ตรงนี้
    </div>
  )
}

export default App