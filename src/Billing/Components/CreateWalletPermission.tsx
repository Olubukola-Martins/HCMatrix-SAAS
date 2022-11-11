import { ErrorMessage, Field, Form, Formik } from "formik";
import Themes from "../../Themes/Themes";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { IDrawerProps } from "../../AppTypes/Component";


const CreateWalletPermission = ({ open, handleClose }: IDrawerProps) => {
  const handleSubmit = () => {};

  return (
    <Modal open={open} onCancel={() => handleClose()} footer={null}>
      <Themes>
        <div style={{ maxWidth: 480 }}>
          <h3 className="font-semibold text-lg">Create Wallet</h3>
          <p className="text-sm pt-1 pb-14">
            System will automatically generate a NUBAN E-Wallet for you. You can
            find the account details on your wallet.
          </p>

          <Formik
            initialValues={{
              walletPermission: false,
            }}
            validationSchema={Yup.object({
              email: Yup.string().required("Field is Required!"),
            })}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <div className="flex gap-5 text-xs">
                <Field
                  type="checkbox"
                  name="walletPermission"
                  className="scale-150"
                  id="walletPermission"
                  required
                />
                <label htmlFor="walletPermission">
                  By checking the box, the system will automatically generate a
                  NUBAN E-Wallet for you
                </label>
              </div>
              <ErrorMessage
                name="walletPermission"
                component="span"
                className="showErrorMsg"
              />

              <div className="grid grid-cols-2 mt-7 gap-5">
                <button
                  type="submit"
                  className="text-sm border border-caramel bg-caramel rounded px-4 py-2 text-white font-medium"
                >
                  Create
                </button>
                <Link to="/billings">
                  <button
                    type="button"
                    className="text-sm border border-caramel rounded px-4 py-2 text-caramel font-medium"
                  >
                    Ignore, Continue with other payment Method
                  </button>
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </Themes>
    </Modal>
  );
};

export default CreateWalletPermission;
