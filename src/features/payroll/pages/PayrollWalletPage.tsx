import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";
import PayrollWalletContainer from "../components/wallet/PayrollWalletContainer";

const PayrollWalletPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Wallet" link={appRoutes.payrollHome} />
        <PayrollWalletContainer />
      </div>
    </>
  );
};

export default PayrollWalletPage;
