# Realtime Streaming ETL :bank:
[:link: Here](https://y8m9d6p8.stackpathcdn.com) is the link for the live demo!

## Overview
Building real-time ETL solution for synthetic bank data.

## Edge Database Resources
### :small_blue_diamond: Document Collections
In Cox Edge Portal, go to **Edge Database/COLLECTIONS** section and create the following list of global document collections.
```
- etl_bank_transactions_raw
- etl_bank_subscriptions_raw
- etl_bank_categories
- etl_bank_clients
```
Some collections will be created automatically at runtime. You don't need to create them.
```
- etl_bank_transactions
- etl_bank_subscriptions
- etl_bank_category_totals
- etl_bank_client_totals
- etl_bank_company_totals
- etl_bank_transactions_anonymization
```
Create **persistent** indexes on the following collections.

| **Collection**                        | **Attribute**                               |
| --------------------------------      | ------------------------------------------- |
| `etl_bank_categories`                 | `name`                                      |
| `etl_bank_category_totals`            | `product_category_name`                     |
| `etl_bank_client_totals`              | `client_name`                               |
| `etl_bank_clients`                    | `email`                                     |
| `etl_bank_company_totals`             | `product_company`                           |
| `etl_bank_subscriptions`              | `client_id`                                 |
| `etl_bank_subscriptions_raw`          | `client_id`                                 |
| `etl_bank_transactions`               | `client_id`                                 |
| `etl_bank_transactions_anonymization` | `client_id`                                 |
| `etl_bank_transactions_raw`           | `client_id`                                 |

:pencil: If you ran this tutorial before, you may want to truncate the collections.

### :small_blue_diamond: Query Workers
In **Edge Database/QUERIES** section, create the following list of query workers.
```
- getBanksTxnsByClient
- getBankTxnsByAnnonymousClient
- getBankSubscriptionsByClient
- getBankCompanyTotals
- getBankCategoryTotals
- getBankClientTotals
- getBankClients
- getBankAnonymizationClient
- getTotals
- etl_bank_transactions_raw_query
- etl_bank_subscriptions_raw_query
```
Refer to this [:link: link ](./edge-database/query-workers/query-workers.md) to get the code for each query worker.

### :small_blue_diamond: Stream Workers
In **Edge Database/STREAM WORKERS** section, create and publish the following list of stream workers.
- [`etl-bank-txn-publisher`](./edge-database/stream-workers/etl-bank-txn-publisher.md)
- [`etl-bank-subscriptions-publisher`](./edge-database/stream-workers/etl-bank-subscriptions-publisher.md)
- [`etl-bank-txns`](./edge-database/stream-workers/etl-bank-txns.md)
- [`etl-bank-subscriptions`](./edge-database/stream-workers/etl-bank-subscriptions.md)
- [`etl-bank-totals`](./edge-database/stream-workers/etl-bank-totals.md)

🔍 You can check each stream worker code by clicking on it.  

## Run It Locally

On your development machine, run the following commands in a terminal console:

```
git clone git@github.com:CoxEdge-Tools/demos.git

cd demos/realtime-stream-etl

npm install

npm start
```

:pencil: You can run `npm run build` command to generate your `build` directory.

:small_red_triangle: Don't forget to setup your environment variables in `.env.development.local` or `.env.production.local`.
