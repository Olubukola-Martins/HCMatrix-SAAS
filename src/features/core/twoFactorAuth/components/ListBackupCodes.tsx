import { Modal } from "antd";
import { DoublePropTwoFA } from "../types";
import { AppButton } from "components/button/AppButton";
import jsPDF from 'jspdf';

export const ListBackupCodes = ({
  open,
  handleClose,
  backupCodes,
}: DoublePropTwoFA) => {

  // Ensure backupCodes is not undefined
  const pairedBackupCodes: string[][] = backupCodes ? [] : [];

  if (backupCodes) {
    for (let i = 0; i < backupCodes.length; i += 2) {
      pairedBackupCodes.push([backupCodes[i], backupCodes[i + 1]]);
    }
  }

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('New 2FA Backup Codes', 10, 10);
    
    pairedBackupCodes.forEach((pair, index) => {
      const yPosition = 30 + (index * 10);
      doc.text(`${pair[0]} ${pair[1] || ''}`, 10, yPosition);
    });

    doc.save('backup_codes.pdf');
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => handleClose()}
      title={`New 2FA Backup Codes`}
      style={{ top: 10 }}
    >
      <div className="pt-5 text-center">
        <p>
          Download these codes and keep them somewhere safe. If you{" "}
          <br className="md:flex hidden" /> lose access to your authentication
          device, you can log in to your <br className="md:flex hidden" />{" "}
          account using any of these codes. Each backup code can only be used
          once.
        </p>

        <div className="flex justify-center mb-3">
          <div className="border py-3 px-20 mt-5 rounded">
            {pairedBackupCodes.map((pair, index) => (
              <div key={index} className="flex justify-between">
                <span className="pr-5 pb-1">{pair[0]}</span>

                {pair[1] && <span>{pair[1]}</span>}
              </div>
            ))}
          </div>
        </div>

        <AppButton type="button" label="Download backup codes" handleClick={handleDownload} />
      </div>
    </Modal>
  );
};
