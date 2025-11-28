import axios from 'axios';

// กำนดตัวแปล
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Interface สำหรับข้อมูล
interface LoginData {
  username: string;
  password: string;
} 

// Register Data Interface
interface RegisterData {
  firstName: string;
  lastName: string;
  employeeId: string;
  departmentName: string;
  username: string;
  email: string;
  password: string;
}

// ส้าง config axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 วินาที
});

// ฟังก์ชันสำหรับ Login
const authLogin = async (data: LoginData) => {
  try {
    const response = await api.post('/Authenticate/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Check if there's an error response from the server
      if (error.response) {
        const errorData = error.response.data;
        // Try to get error message from response
        const errorMessage = errorData?.message || errorData?.Message || 
                           (error.response.status === 401 ? "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาตรวจสอบการเชื่อมต่อ");
      }
    }
    throw new Error("เกิดข้อผิดพลาดที่ไม่รู้จัก");
  }
};

// ฟังก์ชันสำหรับ Register
const authRegister = async (data: RegisterData) => {
  try {
    const response = await api.post('/Authenticate/register-user', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorData = error.response.data;
        const errorMessage = errorData?.message || errorData?.Message || "การลงทะเบียนล้มเหลว";
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาตรวจสอบการเชื่อมต่อ");
      }
    }
    throw new Error("เกิดข้อผิดพลาดที่ไม่รู้จัก");
  }
};

export { api, authLogin, authRegister };
export type { LoginData, RegisterData };