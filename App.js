// App.js
import "./App.css";

// leyland site import start
import LaylandSignin from './Component/Layland/LaylandSignin'
import LaylandRoster from './Component/Layland/LaylandRoster';
import LaylandSceheduleRota from './Component/Layland/LaylandSceheduleRota';
import Laylandpayment from './Component/Layland/Laylandpayment';
import LaylandPaymentSystem from './Component/Layland/LaylandPaymentSystem';
import LaylandInvioce from './Component/Layland/LaylandInvioce';
// leyland site import end

// Machester site import start
import MachesterSignin from "./Component/Manchester/MachesterSignin";
import MachesterRoster from './Component/Manchester/MachesterRoster';
import MachesterSceheduleRota from './Component/Manchester/MachesterSceheduleRota';
import Machesterpayment from './Component/Manchester/Machesterpayment';
import MachesterPaymentSystem from './Component/Manchester/MachesterPaymentSystem';
import MachesterInvioce from './Component/Manchester/MachesterInvioce';
// Machestersite import end

// Rochdale site import start
import RochdaleSignin from './Component/Rochdale/RochdaleSignin'
import RochdaleRoster from './Component/Rochdale/RochdaleRoster';
import RochdaleSceheduleRota from './Component/Rochdale/RochdaleSceheduleRota';
import Rochdalepayment from './Component/Rochdale/Rochdalepayment';
import RochdalePaymentSystem from './Component/Rochdale/RochdalePaymentSystem';
import RochdaleInvioce from './Component/Rochdale/RochdaleInvioce';
//Rochdale import end

// Bolton site import start
import BoltonSignin from "./Component/Bolton/BoltonSignin";
import BoltonRoster from './Component/Bolton/BoltonRoster';
import BoltonSceheduleRota from './Component/Bolton/BoltonSceheduleRota';
import Boltonpayment from './Component/Bolton/Boltonpayment';
import BoltonPaymentSystem from './Component/Bolton/BoltonPaymentSystem';
import BoltonInvioce from './Component/Bolton/BoltonInvioce';
//Bolton import end


// import Test from './Component/Test';
// import Dasbord from './Component/Dasboard/Dasbord';
import AdminSignin from "./Component/Admin/AdminSignin";
import SceheduleRota from "./Component/Admin/SceheduleRota";
import Roster from "./Component/Admin/Roster";
import SubSummary from "./Component/Admin/SubSummary";
import Profile from "./Component/Admin/Profile";
import Notification from "./Component/Admin/Notification";
import Payment from "./Component/Admin/Payment";
import PaymentSystem from "./Component/Admin/PaymentSystem";
import Invioce from "./Component/Admin/Invioce";
import DriverDeduction from "./Component/Admin/DriverDeduction";
import Summary from "./Component/Admin/Summary";
import AddServices from "./Component/Admin/AddServices";
import Manchester from './Component/Admin/Manchester';
import Rochdale from './Component/Admin/Rochdale';
import Bolton from './Component/Admin/Bolton';
import ALayland from './Component/Admin/ALayland'

//admin end

// osite mannager 
import OnSiteSignin from "./Component/OnSiteMannager/OnSiteSignin";
import OnSiteRota from './Component/OnSiteMannager/OnSiteRota';
import OnSiteLayland from './Component/OnSiteMannager/OnsiteLayland';
import OnSiteBolton from './Component/OnSiteMannager/OnSiteBolton';
import OnSiteRochland from './Component/OnSiteMannager/OnSiteRochdale';
import OnSiteManchester from './Component/OnSiteMannager/OnSiteManchester';
import OnsiteRoster from "./Component/OnSiteMannager/OnsiteRoster";
import OnsitePaymentSystem from "./Component/OnSiteMannager/OnsitePaymentSystem";
import Onsitepayment from "./Component/OnSiteMannager/Onsitepayment";
import OnSiteInvioce from './Component/OnSiteMannager/OnSiteInvioce'
import OnSiteSceheduleRota from './Component/OnSiteMannager/OnSiteScehuleRota'
// import Roster from "./Component/OnSiteMannager/ros";

// osite mannager end

// super admin 
import SuperAdminSignin from "./Component/SuperAdmin/SuperAdminSignin";
import SuperAdminDriverDeduction from './Component/SuperAdmin/SuperAdminDriverDeduction'

// super admin 

// fleet mannager 
import FleetSignin from './Component/FleetMannager/FleetManngerSignin'
import AddToFleet from './Component/FleetMannager/AddToFleet'
import FleetData from './Component/FleetMannager/FleetData'
// fleet mannager 

//  real time data 
import RealTimeData from './/Component/Admin/RealTimeData'
//  real time data 

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProfiteLoss from "./Component/Admin/ProfiteLoss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AdminSignin />} />

          <Route path="/SceheduleRota" element={<SceheduleRota />} />
          <Route path="/Roster" element={<Roster />} />

          <Route path="/Manchester" element={<Manchester />} />
          <Route path="/Rochdale" element={< Rochdale />} />
          <Route path="/Bolton" element={<Bolton />} />
          <Route path="/ALayland" element={<ALayland />} />
          <Route path="/subsummary" element={<SubSummary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/PaymentSystem" element={<PaymentSystem />} />
          <Route path="/Invioce" element={<Invioce />} />
          <Route path="/driverdeduction" element={<DriverDeduction />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/addservices" element={<AddServices />} />
          <Route path="/profite-loss" element={<ProfiteLoss />} />

          {/* on site  */}
          <Route path="/OnSiteSignin" element={<OnSiteSignin />} />
          <Route path="/OnSiteRota" element={<OnSiteRota />} />
          <Route path="/OnSiteLayland" element={<OnSiteLayland />} />
          <Route path="/OnSiteBolton" element={<OnSiteBolton />} />
          <Route path="/OnSiteRochland" element={<OnSiteRochland />} />
          <Route path="/OnSiteManchester" element={<OnSiteManchester />} />
          <Route path="/OnSiteSceheduleRota" element={<OnSiteSceheduleRota />} />
          <Route path="/OnsiteRoster" element={<OnsiteRoster />} />
          <Route path="/Onsitepayment" element={<Onsitepayment />} />
          <Route path="/OnsitePaymentSystem" element={<OnsitePaymentSystem />} />
          <Route path="/OnSiteInvioce" element={<OnSiteInvioce />} />
          {/* on site  */}

          {/* super admin  */}

          <Route path="/SuperAdminSignin" element={<SuperAdminSignin />} />
              <Route path="/SuperAdminDriverDeduction" element={<SuperAdminDriverDeduction />} />

          {/* super admin  */}

          {/* fleet Module */}
          <Route path="/FleetManngerSignin" element={<FleetSignin />} />

          <Route path="/AddToFleet" element={<AddToFleet />} />
          <Route path="/FleetData" element={<FleetData />} />
          {/* fleet Module */}


          {/* real time data  */}

          <Route path="/RealTimeData" element={<RealTimeData />} />


          {/* Leyland site data start  */}
          <Route path="/LaylandSignin" element={<LaylandSignin />} />
             <Route path="/LaylandRoster" element={<LaylandRoster />} />
          <Route path="/LaylandSceheduleRota" element={<LaylandSceheduleRota />} />
          <Route path="/Laylandpayment" element={<Laylandpayment />} />
          <Route path="/LaylandPaymentSystem" element={<LaylandPaymentSystem />} />
          <Route path="/LaylandInvioce" element={<LaylandInvioce />} />

          {/* Leyland site data end */}

          {/*Machester site data start  */}
          <Route path="/MachesterSignin" element={<MachesterSignin />} />

          <Route path="/MachesterRoster" element={<MachesterRoster />} />
          <Route path="/MachesterSceheduleRota" element={<MachesterSceheduleRota />} />
          <Route path="/Machesterpayment" element={<Machesterpayment />} />
          <Route path="/MachesterPaymentSystem" element={<MachesterPaymentSystem />} />
          <Route path="/MachesterInvioce" element={<MachesterInvioce />} />

          {/*Machester site data end */}


          {/*Rochdale site data start  */}
          <Route path="/RochdaleSignin" element={<RochdaleSignin />} />
          
          <Route path="/RochdaleRoster" element={<RochdaleRoster />} />
          <Route path="/RochdaleSceheduleRota" element={<RochdaleSceheduleRota />} />
          <Route path="/Rochdalepayment" element={<Rochdalepayment />} />
          <Route path="/RochdalePaymentSystem" element={<RochdalePaymentSystem />} />
          <Route path="/RochdaleInvioce" element={<RochdaleInvioce />} />

          {/*Rochdale site data end */}

          {/*Bolton site data start  */}

          <Route path="/BoltonSignin" element={<BoltonSignin />} />
          <Route path="/BoltonRoster" element={<BoltonRoster />} />
          <Route path="/BoltonSceheduleRota" element={<BoltonSceheduleRota />} />
          <Route path="/Boltonpayment" element={<Boltonpayment />} />
          <Route path="/BoltonPaymentSystem" element={<BoltonPaymentSystem />} />
          <Route path="/BoltonInvioce" element={<BoltonInvioce />} />

          {/*Bolton site data end */}



          {/* real time data  */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
