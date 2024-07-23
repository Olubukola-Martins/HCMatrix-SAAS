import { Collapse, theme } from "antd";
import WalletComplianceDirectors from "./compliance/directors/WalletComplianceDirectors";
import WalletComplianceShareholders from "./compliance/shareholders/WalletComplianceShareholders";
import { SaveComplianceBvn } from "./compliance/bvn/SaveComplianceBvn";
import WalletComplianceDocuments from "./compliance/documents/WalletComplianceDocuments";

const WalletSettingsContainer = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 15,
    background: "var(--background)",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <div className="bg-card lg:px-12 lg:py-10 px-6 py-4 flex flex-col gap-y-4 rounded-md">
      <Collapse
        accordion
        bordered={false}
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        className="bg-transparent"
        items={[
          {
            key: "1",
            label: <span className="text-lg font-bold">Director(s)</span>,
            children: <WalletComplianceDirectors />,
            style: panelStyle,
          },
          {
            key: "2",
            label: <span className="text-lg font-bold">Shareholder(s)</span>,
            children: <WalletComplianceShareholders />,
            style: panelStyle,
          },
          {
            key: "3",
            label: (
              <span className="text-lg font-bold">
                Bank Verification Number
              </span>
            ),
            children: <SaveComplianceBvn />,
            style: panelStyle,
          },
          {
            key: "4",
            label: <span className="text-lg font-bold">Documents</span>,
            children: <WalletComplianceDocuments />,
            style: panelStyle,
          },
        ]}
      />
    </div>
  );
};

export default WalletSettingsContainer;
