import React from "react";
import "./App.css";
import AcmeAccounts from "./components/AcmeAccounts";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Container,
  CardFooter,
} from "reactstrap";

interface Account {
  Number: string;
  Type: string;
  Balance: number;
  Withdraw?: boolean;
}

function App() {
  let [accounts, setAccounts] = React.useState<Account[]>([
    {
      Number: "6331103626640816",
      Type: "cheque",
      Balance: -296.65,
      Withdraw: true,
    },
    {
      Number: "5248117462997084",
      Type: "savings",
      Balance: -20.0,
      Withdraw: false,
    },

    {
      Number: "6331103626640816",
      Type: "cheque",
      Balance: 296.65,
      Withdraw: true,
    },
    {
      Number: "5248117462997084",
      Type: "savings",
      Balance: -2,
      Withdraw: false,
    },
    {
      Number: "6331103626640816",
      Type: "cheque",
      Balance: 96.65,
      Withdraw: true,
    },
  ]);

  let [balance, setBalance] = React.useState<number>(0);

  const isWithdraw = (selectedAccount: Account) => {
    let withdraw: boolean = false;

    if (selectedAccount.Type && selectedAccount.Type === "savings") {
      if (selectedAccount.Balance >= 0) {
        withdraw = true;
      }
    } else if (selectedAccount.Type && selectedAccount.Type === "cheque") {
      if (selectedAccount.Balance >= -500) {
        withdraw = true;
      }
    }

    return withdraw;
  };

  React.useEffect(() => {
    axios
      .get("")
      .then((res) => {
        console.log(res);
        // setAccounts([]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    let total: number = accounts.reduce((a: number, b: Account) => {
      return a + b.Balance;
    }, 0);

    setBalance(total);
  }, [accounts]);

  return (
    <div className="App">
      <div className="Acme-Card">
        <Container>
          <CardImg
            top
            src="../assets/acme_logo.svg"
            alt="ACME Bank Logo"
            className="Logo"
          />
          <Card>
            <CardHeader>Account Dashboard</CardHeader>

            <CardBody>
              <AcmeAccounts accounts={accounts} />
            </CardBody>

            <CardFooter className="text-muted">
              {balance && balance >= 0 ? (
                <span style={{ color: "green" }}>{balance.toFixed(2)}</span>
              ) : (
                <span style={{ color: "red" }}>{balance.toFixed(2)}</span>
              )}
            </CardFooter>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default App;
