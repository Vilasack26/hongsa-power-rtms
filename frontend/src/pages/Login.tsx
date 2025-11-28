import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useForm } from 'react-hook-form'
import { authLogin, type LoginData } from "@/services/apiAuth"
import { toast } from "sonner"

function Login() {
// ทดสอบการดึงค่าตัวแปรจาก .env
  console.log(import.meta.env.VITE_API_URL);

  const navigate = useNavigate()

  // ตั้ง title หน้า
  useEffect(() => {
    document.title = "Login | Hongsa Power RTMS"
  }, [])

  // การใช้ React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()

  // ฟังก์ชันเมื่อ Submit form
  const [loginError, setLoginError] = useState<string | null>(null)

  const onSubmit = async (data: LoginData) => {
    console.log(data);
    setLoginError(null) // Clear previous errors
    try {
      const response = await authLogin(data)
      console.log("Login successful:", response)

       // Store Auth Data
      localStorage.setItem("token", response.token)
      localStorage.setItem("roles", JSON.stringify(response.roles))
      localStorage.setItem("username", data.username)
      localStorage.setItem("firstName", response.firstName)
      localStorage.setItem("lastName", response.lastName)

      // Redirect to dashboard or another page
      navigate("/backend/dashboard")

      // Popup แจ้งเตือนเข้าสู่ระบบสำเร็จ
      toast.success("เข้าสู่ระบบสำเร็จ", {
        description: "ยินดีต้อนรับกลับ",
      })
    } 

    catch (error) {
      console.error("Login failed:", error)
      // Display error message to user
      const errorMessage = error instanceof Error ? error.message : "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง"
      setLoginError(errorMessage)

      // Popup แจ้งเตือนเข้าสู่ระบบไม่สำเร็จ
      toast.error("เข้าสู่ระบบไม่สำเร็จ", {
      description: errorMessage,

      // Duration of the error toast in milliseconds
      duration: 5000 
      })
    }
  }



  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">ยินดีต้อนรับกลับ</h1>
        <p className="text-sm text-slate-500">
          เข้าสู่ระบบเพื่อจัดการข้อมูลสถานะเครื่องจักร
        </p>
      </div>

      <div className="space-y-4">
        {loginError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm font-medium">{loginError}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>ชื่อผู้ใช้งาน / อีเมล</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                id="username"
                {...register("username", { required: "กรุณากรอกชื่อผู้ใช้งานของคุณ" })} 
                className={`pl-10 ${errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}`}  
                placeholder="username หรือ email@example.com" />
            </div>
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message as string}</p>}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>รหัสผ่าน</Label>
              <Button variant="link" className="text-xs" asChild>
                <Link to="/auth/forgot-password">
                  ลืมรหัสผ่าน?
                </Link>
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                id="password"
                {...register("password", { required: "กรุณากรอกรหัสผ่านของคุณ" })} 
                className={`pl-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`} 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message as string}</p>}
          </div>  
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer group">
            เข้าสู่ระบบ 
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>

      <div className="text-center text-sm">
        ยังไม่มีบัญชีใช่ไหม?{" "}
        <Button variant="link" asChild>
          <Link to="/auth/register">
            ลงทะเบียนผู้ใช้งานใหม่
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Login