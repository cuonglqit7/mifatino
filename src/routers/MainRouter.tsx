import { Layout } from "antd";
import HomeScreen from "@/screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Inventories,
  ManagerStore,
  Orders,
  Reports,
  Suppliers,
} from "@/screens";
import { HeaderCo, SiderCo } from "@/components";

const { Content, Footer } = Layout;

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <SiderCo />
        <Layout>
          <HeaderCo />
          <Content>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/inventories" element={<Inventories />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/manager-store" element={<ManagerStore />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
