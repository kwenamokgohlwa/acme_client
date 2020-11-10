import React from "react";
import { Button } from "reactstrap";
import alert from "sweetalert";

interface Account {
  Number: string;
  Type: string;
  Balance: number;
  Withdraw?: boolean;
}

const AcmeAccount: React.FC<Account> = ({
  Number,
  Type,
  Balance,
  Withdraw = false,
}) => {
  return (
    <React.Fragment>
      <td>{Number}</td>
      <td>{Type}</td>
      <td>
        {Balance && Balance >= 0 ? (
          <span style={{ color: "green" }}>{Balance.toFixed(2)}</span>
        ) : (
          <span style={{ color: "red" }}>{Balance.toFixed(2)}</span>
        )}
      </td>
      <td>
        <Button
          onClick={() =>
            alert(
              "Success!",
              "You have successfully withdrawn funds.",
              "success"
            )
          }
          disabled={!Withdraw}
          color="danger"
        >
          Withdraw
        </Button>
      </td>
    </React.Fragment>
  );
};

export default AcmeAccount;
