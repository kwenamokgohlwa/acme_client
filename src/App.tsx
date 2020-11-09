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
  ]);

  let [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/accounts")
      .then((res) => {
        let accountsData: Account[] = res.data.map(
          (accountIn: {
            account_number: string;
            account_type: string;
            balance: string;
          }) => {
            let withdraw: boolean = false;

            if (accountIn.account_type === "savings") {
              if (+accountIn.balance >= 0) {
                withdraw = true;
              }
            } else if (accountIn.account_type === "cheque") {
              if (+accountIn.balance >= -500) {
                withdraw = true;
              }
            }

            return {
              Number: accountIn.account_number,
              Type: accountIn.account_type,
              Balance: +accountIn.balance,
              Withdraw: withdraw || false,
            };
          }
        );

        return accountsData;
      })
      .then((accountArray) => {
        setAccounts(accountArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    let sum: number = accounts.reduce((a: number, b: Account) => {
      return a + b.Balance;
    }, 0);

    setTotal(sum);
  }, [accounts]);

  return (
    <div className="App">
      <div className="Acme-Card">
        <Container className="Acme-Dashboard">
          <CardImg
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
              {total && total >= 0 ? (
                <span style={{ color: "green" }}>{total}</span>
              ) : (
                <span style={{ color: "red" }}>{total}</span>
              )}
            </CardFooter>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default App;
