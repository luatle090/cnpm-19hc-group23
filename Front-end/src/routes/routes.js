import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Login from "@/pages/Auth/LoginUser.vue";
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
        path: "hopdong",
        name: "Hợp đồng",
        component: () => import("../pages/HopDong/Content"),
        redirect: "/hopdong/",
        children:[
          {
            path: "/",
            name: "Hợp đồng",
            component: () => import("../pages/HopDong/HomeHopDong"),
            props: true,
          },
          {
            path: "taohopdong",
            name: "Tạo Hợp đồng",
            component: () => import("../pages/HopDong/CreateHopDong"),
            props: true
          },
          {
            path: "capnhat/:id",
            name: "Cập nhật hợp đồng",
            component: () => import("../pages/HopDong/CreateHopDong"),
            props: { update: true }
          },
        ]
      },
      {
        path: "thanhtoan/:id",
        name: "Thanh toán",
        component: () => import("../pages/HopDong/PaymentHopDong"),
        props: true
      },
      {
        path: "baoduong",
        name: "Bảo dưỡng",
        component: () => import("../pages/BaoDuong/Content"),
        redirect: "/baoduong/",
        children:[
          {
            path: "/",
            name: "Bảo dưỡng",
            component: () => import("../pages/BaoDuong/HomeBaoDuong"),
            props: true,
          },
          {
            path: "detailbaoduong/:id",
            name: "Xem chi tiết Bảo dưỡng",
            component: () => import("../pages/BaoDuong/DetailBaoDuong"),
          },
          {
            path: "capnhat/:id",
            name: "Cập nhật Bảo dưỡng",
            component: () => import("../pages/BaoDuong/UpdateBaoDuong"),
            props: { update: true }
          },
        ]
      },
      {
        path: "xeoto",
        name: "Xe Ô tô",
        component: () => import("../pages/XeOto/ContentXeOto"),
        redirect: "/xeoto/",
        children:[
          {
            path: "/",
            name: "Xe Ô tô",
            component: () => import("../pages/XeOto/HomeXeOto"),
            props: true
          },
          {
            path: "taoxeoto",
            name: "Tạo Ô tô",
            component: () => import("../pages/XeOto/CreateXeOto")
          },
          {
            path: "capnhatxe/:id",
            name: "Cập nhật Ô tô",
            component: () => import("../pages/XeOto/CreateXeOto"),
            props: { update: true }
          },
        ]
      },
      {
        path: "xekhachtra",
        name: "Kiểm tra xe khách trả",
        component: () => import("../pages/XeKhachTra/Content"),
        redirect: "/xekhachtra/",
        children:[
          {
            path: "/",
            name: "Kiểm tra xe khách trả",
            component: () => import("../pages/XeKhachTra/HomeXeKhachTra"),
            props: true,
          },
          {
            path: "detailxekhachtra/:id",
            name: "Chi tiết tình trạng xe khách trả",
            component: () => import("../pages/XeKhachTra/DetailXeKhachTra"),
          },
          {
            path: "capnhat/:id",
            name: "Cập nhật xe khách trả",
            component: () => import("../pages/XeKhachTra/UpdateXeKhachTra"),
            props: { update: true }
          },
        ]
      },
      {
        path: "baocaodoanhthu",
        name: "Báo cáo doanh thu",
        component: () => import("../pages/BaoCao/BaoCaoDoanhSo"),
      },
      {
        path: "baocaochitieu",
        name: "Báo cáo chi tiêu",
        component: () => import("../pages/BaoCao/BaoCaoChiTieu"),
      },
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
    path: '*', 
    component: NotFoundComponent 
  }
     
];

export default routes;
