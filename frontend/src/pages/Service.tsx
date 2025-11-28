import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

function Service() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-amber-600">Service Page</h2>
      <p>Service information will be displayed here.</p>
      <Button>
        <Zap className="mr-2 h-4 w-4" />
        Contact Us 
      </Button>
    </div>
  )
}
export default Service