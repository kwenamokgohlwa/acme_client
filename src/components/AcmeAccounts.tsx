import React from "react";
import { Table } from "reactstrap";
import AcmeAccount from "./AcmeAccount";

interface Account {
  Number: string;
  Type: string;
  Balance: number;
  Withdraw?: boolean;
}

interface Accounts {
  accounts: Account[];
}

const AcmeAccounts: React.FC<Accounts> = ({ accounts }) => {
  return (
    <Table striped bordered responsive className="Acme-Table">
      <Head />
      <tbody>
        {accounts &&
          accounts.map((account, index) => {
            return (
              <tr key={index.toString()}>
                <AcmeAccount {...account} />
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

const Head = () => {
  return (
    <thead>
      <tr>
        <th>Account Number</th>
        <th>Account Type</th>
        <th>Balance</th>
        <th>{""}</th>
      </tr>
    </thead>
  );
};

export default AcmeAccounts;
