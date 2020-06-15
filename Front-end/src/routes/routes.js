import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Login from "@/pages/Auth/LoginUser.vue";
import Admin from "@/pages/admin/layout/layout.vue"
import adminLogin from "@/pages/admin/adminLogin.vue"
import NotFoundComponent from "@/pages/NotFound.vue"
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "taikhoannganhang",
        name: "Tài Khoản Ngân Hàng",
        component: () => import("./../pages/customer/taikhoannganhang")
      },
     
      {
        path: "lichsuchuyenkhoan",
        name: "Lịch Sử Chuyển Khoản",
        component: () => import("../pages/customer/lichSuChuyenKhoan")
      },
      {
        path: "lichsunhantien",
        name: "Lịch Sử Nhận Tiền",
        component: () => import("../pages/customer/lichSuNhanTien")
      },
      {
        path: "chuyenkhoannoibo",
        name: "Chuyển khoản",
        component: () => import("../pages/chuyenKhoan/chuyenKhoanNoiBo")
      },
      {
        path: "xacnhanchuyenkhoan",
        name: "Xác nhận Chuyển khoản",
        component: () => import("../pages/chuyenKhoan/xacNhanChuyenKhoanNoiBo")
      },
      {
        path: "cklnh",
        name: "Chuyển khoản liên ngân hàng",
        component: () => import("../pages/chuyenKhoan/chuyenKhoanLienNganHang")
      },
      {
        path: "xacnhancklnh",
        name: "Xác nhận chuyển khoản liên ngân hàng",
        component: () => import("../pages/chuyenKhoan/xacNhanChuyenKhoanLienNganHang")
      },
      {
        path: "hopdong",
        name: "Hợp đồng",
        component: () => import("../pages/HopDong/HomeHopDong"),
        props: true
      },
      {
        path: "taohopdong",
        name: "Tạo Hợp đồng",
        component: () => import("../pages/HopDong/CreateHopDong"),
        props: true
      },
      {
        path: "thanhtoan",
        name: "Thanh toán",
        component: () => import("../pages/HopDong/PaymentHopDong"),
        props: true
      },
      {
        path: "baoduong",
        name: "Bảo dưỡng",
        component: () => import("../pages/BaoDuong/HomeBaoDuong"),
      },
      {
        path: "detailbaoduong",
        name: "Xem chi tiết Bảo dưỡng",
        component: () => import("../pages/BaoDuong/DetailBaoDuong"),
      },
      {
        path: "updatebaoduong",
        name: "Cập nhật Bảo dưỡng",
        component: () => import("../pages/BaoDuong/UpdateBaoDuong"),
      },
      {
        path: "xeoto",
        name: "Xe Ô tô",
        component: () => import("../pages/XeOto/HomeXeOto"),
      },
      {
        path: "taoxeoto",
        name: "Tạo Ô tô",
        component: () => import("../pages/XeOto/CreateXeOto"),
      },
      {
        path: "thietlapnguoinhan",
        name: "Thiết lập người nhận",
        component: () => import("../pages/customer/thietlapnguoinhan")
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/forgot",
    name: "Forgot Password",
    component: () => import("../pages/Auth/ForgotPassword")
  },
  {
    path: "/admin/login",
    name: "Admin Login",
    component: adminLogin
  },
  {
    path: "/admin",
    component: Admin,
    meta: { requiresAuth:true },
    children: [
      {
        path: "danhsachnhanvien",
        name: "Danh Sách Nhân Viên",
        component: () => import("../pages/admin/nhanvien/dsnhanvien")
      },
      {
        path: "danhsachkhachhang",
        name: "Danh Sách Khách Hàng",
        component: () => import("../pages/admin/employee/dskhachhang")
      },
      {
        path: "lichsugiaodich",
        name: "Lịch sử giao dịch",
        component: () => import("../pages/admin/employee/lichsugiaodich")
      },
      {
        path: "doisoat",
        name: "Đối soát",
        component: () => import("../pages/admin/employee/doisoat")
      },
      {
        path: "dashboard",
        name: "Dashboard Admin",
        component: () => import("../pages/admin/DashboardAdmin")
      },
      {
        path: "logout",
        name: "Admin Logout",
        component: () => import("../pages/admin/adminLogout")
      },
    ]
  },
  { 
    path: '*', 
    component: NotFoundComponent 
  }
     
];

export default routes;
