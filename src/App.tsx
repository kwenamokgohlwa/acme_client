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
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Badge,
} from "reactstrap";

interface Account {
  Number: string;
  Type: string;
  Balance: number;
  Withdraw?: boolean;
}

function App() {
  const [accounts, setAccounts] = React.useState<Account[]>([
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

  const [total, setTotal] = React.useState<number>(0);

  const [amount, setAmount] = React.useState(0);

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
              if (+accountIn.balance >= 0 && amount <= +accountIn.balance) {
                withdraw = true;
              }
            } else if (accountIn.account_type === "cheque") {
              if (
                +accountIn.balance >= -500 &&
                amount <= +accountIn.balance + 500
              ) {
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
  }, [amount]);

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
            <CardHeader>
              <div className="Amount">
                <InputGroup>
                  <Input
                    placeholder="amount"
                    name="amount"
                    onChange={(event) => {
                      setAmount(+event.target.value || 0);
                    }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Amount</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </CardHeader>

            <CardBody>
              <AcmeAccounts accounts={accounts} />
            </CardBody>

            <CardFooter className="text-muted">
              <h4>
                <Badge color="secondary">{total}</Badge>
              </h4>
            </CardFooter>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default App;
