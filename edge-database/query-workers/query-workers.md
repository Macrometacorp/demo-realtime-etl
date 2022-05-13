**getBanksTxnsByClient:**
```js
For clients in etl_bank_transactions FILTER clients.client_name==@clientName
return clients
```

**getBankTxnsByAnnonymousClient:**
```js
For clients in etl_bank_transactions_anonymization Filter clients.client_name==@clientName
Return clients
```

**getBankSubscriptionsByClient:**
```js
For clients in etl_bank_subscriptions Filter clients.client_name==@clientName
Return clients
```

**getBankCompanyTotals:**
```js
For company in etl_bank_company_totals
Sort company.total_amount DESC
LIMIT @topN 
Return company
```

**getBankCategoryTotals:**
```js
For category in etl_bank_category_totals
Sort category.total_amount DESC
LIMIT @topN 
Return category
```

**getBankClientTotals:**
```js
For clients in etl_bank_client_totals
Sort clients.total_amount DESC
LIMIT @topN 
Return clients
```

**getBankClients:**
```js
For clients in etl_bank_clients 
limit @offsetValue,100
Return {clientName:clients.fullname,key:clients._key,email:clients.email}
```

**getBankAnonymizationClient:**
```js
For clients in etl_bank_transactions_anonymization 
limit @offsetValue,100
Return {clientName:clients.client_name,key:clients._key}
```

**getTotals**
```js
LET category_total = (
    FOR i IN etl_bank_category_totals
    RETURN i.total_amount
)
LET company_total = (
    FOR i IN etl_bank_company_totals
    RETURN i.total_amount
)
LET client_total = (
    FOR i IN etl_bank_client_totals
    RETURN i.total_amount
)

FOR individual_sums IN [[client_total], [company_total], [category_total]]
    FOR totals in individual_sums
    RETURN SUM(totals)
```

**etl_bank_transactions_raw_query:**
```js
for doc in etl_bank_transactions_raw 
SORT doc._key asc
limit @offsetValue, 100  
return doc
```

**etl_bank_subscriptions_raw_query:**
```js
for doc in etl_bank_subscriptions_raw 
SORT doc._key asc
limit @offsetValue, 100 
return doc
```
