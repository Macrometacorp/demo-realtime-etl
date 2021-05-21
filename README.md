# Realtime ETL using GDN
**Live Demo: https://macrometacorp.github.io/demo-realtime-etl/**
Building real-time ETL solution for synthetic bank data using GDN

![realtime-etl.png](realtime-etl.png)

## Setup

| **Federation** | **Email** | **Passsword** |
|------------|----------|--------------|
| [Global Data Network](https://gdn.paas.macrometa.io/) | demo-stream-etl@macrometa.io | `xxxxxxxx`| 
| [Analytics Dashboard](TBD) | -- | -- |


## How to Run
**On Federation:**

> ```
> Create and publish following Stream Workers in your federation:
> 1. etl-bank-txn-publisher
> 2. etl-bank-subscriptions-publisher
> 3. etl-bank-txns
> 4. etl-bank-subscriptions
> 5. etl-bank-totals
> 
>  Following Query Workers needs to be created:
> 1. getBanksTxnsByClient
> 2. getBankTxnsByAnnonymousClient
> 3. getBankSubscriptionsByClient
> 4. getBankCompanyTotals
> 5. getBankCategoryTotals
> 6. getBankClientTotals
> 7. getBankClients
> 8. getBankAnonymizationClient
> 9. etl_bank_transactions_raw_query
> 10.etl_bank_subscriptions_raw_query
> 
> Following doc collections needs to be created:
> 1. etl_bank_transactions_raw (seed data, global)
> 2. etl_bank_subscriptions_raw (seed data, global)
> 3. etl_bank_categories (seed data, global)
> 4. etl_bank_clients (seed data, global)
> 
> Following doc collections are created automatically:
> 5. etl_bank_transactions (global)
> 6. etl_bank_subscriptions (global)
> 7. etl_bank_category_totals (global)
> 8. etl_bank_client_totals (global)
> 9. etl_bank_company_totals (global)
> 10.etl_bank_transactions_anonymization (global)
> 
> Note: If you have run this tutorial before, you may want to truncate the collections.
> ```

**On Development Machine:**

> ```
> git clone https://github.com/Macrometacorp/demo-realtime-etl.git
> cd demo-realtime-etl
> git fetch
> npm install
> npm run start
> ```


## Details

### Stream Workers

**etl-bank-txn-publisher:**
```
@App:name("etl-bank-txn-publisher")
@App:description("etl-bank-txn-publisher")

-- The trigger
define trigger etlBankTransactionTrigger at every 5 seconds;

/*
This app reads every 5 seconds 100 records from etl_bank_transactions_raw collection.
Then it publish the data in EtlTransactionRawStream stream which will be used as pipeline in the next stream app.
The data from the etl_bank_transactions_raw is fetched using restql etl_bank_transactions_raw_query and published in restqlStreamResponse stream.
*/

/**
Testing the Stream Application:
    1. Make sure to create the etl_bank_transactions_raw_query restql
	2. Publish the app       
    
*/
@sink(type='restql-call',restql.name="etl_bank_transactions_raw_query",sink.id="etl_bank")
define stream restqlStream(value long, offsetValue long);


@source(type='restql-call-response',sink.id="etl_bank", @map(type="json"))
define stream restqlStreamResponse(txn_id string, client_id string, product_category string, product_company string, subtype string, amount string, date string, transaction_type string);

@sink(type = 'c8streams', stream = "EtlTransactionRawStream", replication.type="global")
define stream EtlTransactionRawStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount string, date string, transaction_type string);

select  eventTimestamp() as value, (count() * 100) - 100  as offsetValue
from etlBankTransactionTrigger
insert into restqlStream;

select txn_id , client_id , product_category , product_company , subtype , amount , date , transaction_type 
from restqlStreamResponse
insert into EtlTransactionRawStream;

```

**etl-bank-subscriptions-publisher:**
```
@App:name("etl-bank-subscriptions-publisher")
@App:description("etl-bank-subscriptions-publisher")

-- The trigger
define trigger etlBankSubscriptionTrigger at every 5 seconds;

/*
This app reads every 5 seconds 100 records from etl_bank_subscriptions_raw collection.
Then it publish the data in EtlSubscriptionRawStream stream which will be used as pipeline in the next stream app.
The data from the etl_bank_subscriptions_raw is fetched using restql etl_bank_subscriptions_raw_query and published in restqlStreamResponse stream.
*/

/**
Testing the Stream Application:
    1. Make sure to create the etl_bank_subscriptions_raw_query restql
	2. Publish the app       
    
*/

@sink(type='restql-call',restql.name="etl_bank_subscriptions_raw_query",sink.id="etl_bank_subscription")
define stream restqlStream(offsetValue long);

@source(type='restql-call-response',sink.id="etl_bank_subscription", @map(type="json"))
define stream restqlStreamResponse(id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string);

@sink(type = 'c8streams', stream = "EtlSubscriptionRawStream", replication.type="global")
define stream EtlSubscriptionRawStream (id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string);

--select  eventTimestamp() as value, (count() * 100) - 100  as offsetValue
select  (count() * 100) - 100  as offsetValue
from etlBankSubscriptionTrigger
insert into restqlStream;

select  id, client_id, product_category, product_company, amount, date_start, date_end
from restqlStreamResponse
insert into EtlSubscriptionRawStream;

```

**etl-bank-txns:**
```
@App:name("etl-bank-txns")
@App:description("etl-bank-txns")

@source(type = 'c8streams',  stream.list="EtlTransactionRawStream" , replication.type="global", @map(type='json'))
define stream EtlTransactionRawStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount string, date string, transaction_type string);


@store(type='c8db', collection='etl_bank_transactions', replication.type="global")
define table etlbanktransactions(txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);

@store(type='c8db', collection='etl_bank_transactions_anonymization', replication.type="global")
define table etlbanktransactionsanonymization(txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);

@store(type='c8db', collection='etl_bank_clients', replication.type="global")
define table etlbankclients(id string, fullname string, address string, phone_number string, email string, workplace string, birthdate string, registration_date string, gender string, income string, expenses string, credit string, deposit string);

@store(type='c8db', collection='etl_bank_categories', replication.type="global")
define table etlbankcategories(id string, name string, description string);

-- Streams for enriching the bank_transation data
--------------------------------------------------------------------------------------------------------------------------

@sink(type = 'c8streams', stream = "EtlBankTransactionEnricherClientNameStream", replication.type="global")
define stream EtlBankTransactionEnricherClientNameStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string);

@sink(type = 'c8streams', stream = "EtlBankTransactionEnricherProductCategoryStream", replication.type="global")
define stream EtlBankTransactionEnricherProductCategoryStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);


@sink(type = 'c8streams', stream = "EtlTransactionStream", replication.type="global")
define stream EtlTransactionStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);


select  txn.txn_id , txn.client_id, txn.product_category, txn.product_company, txn.subtype, convert(txn.amount, 'double') as amount, txn.date, txn.transaction_type, client.fullname as client_name
from EtlTransactionRawStream as txn join etlbankclients as client on txn.client_id == client.id 
insert into EtlBankTransactionEnricherClientNameStream;

select  clientS1.txn_id , clientS1.client_id, clientS1.product_category, clientS1.product_company, clientS1.subtype, clientS1.amount, clientS1.date, clientS1.transaction_type, clientS1.client_name, category.name as product_category_name 
from EtlBankTransactionEnricherClientNameStream as clientS1 join etlbankcategories as category on clientS1.product_category == category.id 
insert into EtlBankTransactionEnricherProductCategoryStream;

select   txn_id , client_id, product_category, product_company, subtype, amount, date, transaction_type, client_name, product_category_name
from EtlBankTransactionEnricherProductCategoryStream
insert into etlbanktransactions;

select   txn_id , client_id, product_category, product_company, subtype, amount, date, transaction_type, cache:get(client_id,pii:fake('Name', "NAME_FULLNAME", true)) as client_name, product_category_name
from EtlBankTransactionEnricherProductCategoryStream
insert into etlbanktransactionsanonymization;


select   txn_id , client_id, product_category, product_company, subtype, amount, date, transaction_type, client_name, product_category_name
from EtlBankTransactionEnricherProductCategoryStream
insert into EtlTransactionStream;
  

```

**etl-bank-subscription:**
```
@App:name("etl-bank-subscriptions")
@App:description("etl-bank-subscriptions")

/*
This app will enrinch the data published in EtlSubscriptionRawStream with client name and product category name and insert that enrinched data in etlbanksubscriptions table.
*/


@source(type = 'c8streams', collection = "etl_bank_transactions", stream.list="EtlSubscriptionRawStream" , replication.type="global", @map(type='json'))
define stream EtlSubscriptionRawStream (id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string);

@store(type='c8db', collection='etl_bank_subscriptions', replication.type="global")
define table etlbanksubscriptions(id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string, client_name string, product_category_name string);

@store(type='c8db', collection='etl_bank_clients', replication.type="global")
define table etlbankclients(id string, fullname string, address string, phone_number string, email string, workplace string, birthdate string, registration_date string, gender string, income string, expenses string, credit string, deposit string);

@store(type='c8db', collection='etl_bank_categories', replication.type="global")
define table etlbankcategories(id string, name string, description string);


@sink(type = 'c8streams', stream = "EtlBankSubscriptionEnricherClientNameStream")
define stream EtlBankSubscriptionEnricherClientNameStream (id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string, client_name string);

@sink(type = 'c8streams', stream = "EtlBankSubscriptionEnricherProductCategoryStream")
define stream EtlBankSubscriptionEnricherProductCategoryStream (id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string, client_name string, product_category_name string);

select  subs.id , subs.client_id, subs.product_category, subs.product_company, subs.amount, subs.date_start, subs.date_end, client.fullname as client_name
from EtlSubscriptionRawStream as subs join etlbankclients as client on subs.client_id == client.id 
insert into EtlBankSubscriptionEnricherClientNameStream;


select  clientS1.id , clientS1.client_id, clientS1.product_category, clientS1.product_company, clientS1.amount, clientS1.date_start, clientS1.date_end, clientS1.client_name, category.name as product_category_name
from EtlBankSubscriptionEnricherClientNameStream as clientS1 join etlbankcategories as category on clientS1.product_category == category.id 
insert into EtlBankSubscriptionEnricherProductCategoryStream;

select id , client_id , product_category, product_company, amount, date_start, date_end, client_name, product_category_name
from EtlBankSubscriptionEnricherProductCategoryStream 
insert into etlbanksubscriptions;

  
```

**etl-bank-totals:**
```
@App:name("etl-bank-totals")
@App:description("etl-bank-totals")

/*
This app will calculate the total of amount for clientname, companyname, productcategoryname from the data published in EtlTransactionStream and published the calculated data in EtlBankClientNameTotalStream, EtlBankCompanyNameTotalStream and EtlBankCategoryNameTotalStream. Also it will populate calculated data in etlbankclienttotals, etlbankcompanytotals
and etlbankcategorytotals tables.
*/


@source(type = 'c8streams',  stream.list="EtlTransactionStream" , replication.type="global", @map(type='json'))
define stream EtlTransactionStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);

@store(type='c8db', collection='etl_bank_client_totals', replication.type="global")
define table etlbankclienttotals(client_name string, total_amount double);

@store(type='c8db', collection='etl_bank_company_totals', replication.type="global")
define table etlbankcompanytotals(product_company string, total_amount double);

@store(type='c8db', collection='etl_bank_category_totals', replication.type="global")
define table etlbankcategorytotals(product_category_name string, total_amount double);


-- Streams for calculating the totals 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

@sink(type = 'c8streams', stream = "EtlBankClientNameTotalStream", replication.type="global")
define stream EtlBankClientNameTotalStream (client_name string, total_amount double);

@sink(type = 'c8streams', stream = "EtlBankCompanyNameTotalStream", replication.type="global")
define stream EtlBankCompanyNameTotalStream (product_company string, total_amount double);

@sink(type = 'c8streams', stream = "EtlBankCategoryNameTotalStream", replication.type="global")
define stream EtlBankCategoryNameTotalStream (product_category_name string, total_amount double);

select client_name, sum(amount) as total_amount
from EtlTransactionStream group by client_name
insert into EtlBankClientNameTotalStream;

select  client_name,  total_amount
from EtlBankClientNameTotalStream 
update or insert into etlbankclienttotals 
    on etlbankclienttotals.client_name == client_name;

select product_company, sum(amount) as total_amount
from EtlTransactionStream group by product_company
insert into EtlBankCompanyNameTotalStream;

select  product_company,  total_amount
from EtlBankCompanyNameTotalStream 
update or insert into etlbankcompanytotals 
    on etlbankcompanytotals.product_company == product_company;


select product_category_name, sum(amount) as total_amount
from EtlTransactionStream group by product_category_name
insert into EtlBankCategoryNameTotalStream;

select  product_category_name,  total_amount
from EtlBankCategoryNameTotalStream 
update or insert into etlbankcategorytotals 
    on etlbankcategorytotals.product_category_name == product_category_name;
 
```


### Document Collections

1. etl_bank_transactions_raw (seed data, global)
2. etl_bank_subscriptions_raw (seed data, global)
3. etl_bank_categories (seed data, global)
4. etl_bank_clients (seed data, global)
5. etl_bank_transactions (global)
6. etl_bank_subscriptions (global)
7. etl_bank_client_totals (global)
8. etl_bank_company_totals (global)
9. etl_bank_category_totals (global)
10.etl_bank_transactions_anonymization (global)

### Indexes

TBD

### Query Workers

**getBanksTxnsByClient:**
```
For clients in etl_bank_transactions FILTER clients.client_name==@clientName
return clients
```

**getBankTxnsByAnnonymousClient:**
```
For clients in etl_bank_transactions_anonymization Filter clients.client_name==@clientName
Return clients
```

**getBankSubscriptionsByClient:**
```
For clients in etl_bank_subscriptions Filter clients.client_name==@clientName
Return clients
```
**getBankCompanyTotals:**
```
For company in etl_bank_company_totals
Sort company.total_amount DESC
LIMIT @topN 
Return company
```
**getBankCategoryTotals:**
```
For category in etl_bank_category_totals
Sort category.total_amount DESC
LIMIT @topN 
Return category
```
**getBankClientTotals:**
```
For clients in etl_bank_client_totals
Sort clients.total_amount DESC
LIMIT @topN 
Return clients
```
**getBankClients:**
```
For clients in etl_bank_clients 
limit @offsetValue,100
Return {clientName:clients.fullname,key:clients._key,email:clients.email}
```
**getBankAnonymizationClient:**
```
For clients in etl_bank_transactions_anonymization 
limit @offsetValue,100
Return {clientName:clients.client_name,key:clients._key}
```
**etl_bank_transactions_raw_query:**
```
for doc in etl_bank_transactions_raw 
SORT doc._key asc
limit @offsetValue, 100  
return doc
```
**etl_bank_subscriptions_raw_query:**
```
for doc in etl_bank_subscriptions_raw 
SORT doc._key asc
limit @offsetValue, 100 
return doc
```
## Developer Notes

**TBD**




