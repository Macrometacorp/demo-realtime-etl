```js
@App:name("etl-bank-txns")
@App:description("etl-bank-txns")


-- Source definition. Stream worker reads transactions from this EtlTransactionRawStream global stream.
@source(type = 'c8streams',  stream.list="EtlTransactionRawStream" , replication.type="global", @map(type='json'))
define stream EtlTransactionRawStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount string, date string, transaction_type string);

-- Table definition. Stream worker writes bank transactions to this table - etlbanktransactions.
@store(type='c8db', collection='etl_bank_transactions', replication.type="global")
define table etlbanktransactions(txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);

-- Table definition. Stream worker writes anonymous bank transactions to this table - etl_bank_transactions_anonymization.
@store(type='c8db', collection='etl_bank_transactions_anonymization', replication.type="global")
define table etlbanktransactionsanonymization(txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);


-- Table definition. Stream worker reads bank purchaser(clients) from this table - etlbankclients.
@store(type='c8db', collection='etl_bank_clients', replication.type="global")
define table etlbankclients(id string, fullname string, address string, phone_number string, email string, workplace string, birthdate string, registration_date string, gender string, income string, expenses string, credit string, deposit string);

-- Table definition. Stream worker reads bank categories from this table - etlbankcategories.
@store(type='c8db', collection='etl_bank_categories', replication.type="global")
define table etlbankcategories(id string, name string, description string);

-- Streams for enriching the bank_transaction data
--------------------------------------------------------------------------------------------------------------------------
-- Sink definition for EtlBankTransactionEnricherClientNameStream  worker.
@sink(type = 'c8streams', stream = "EtlBankTransactionEnricherClientNameStream", replication.type="global")
define stream EtlBankTransactionEnricherClientNameStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string);

-- Sink definition for EtlBankTransactionEnricherProductCategoryStream  worker.
@sink(type = 'c8streams', stream = "EtlBankTransactionEnricherProductCategoryStream", replication.type="global")
define stream EtlBankTransactionEnricherProductCategoryStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);

-- Sink definition for EtlTransactionStream  worker.
@sink(type = 'c8streams', stream = "EtlTransactionStream", replication.type="global")
define stream EtlTransactionStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount double, date string, transaction_type string, client_name string, product_category_name string);




/**
Enriches each transaction message in the stream and writes to a temporary stream - EtlTransactionRawStream
Each transaction message is enriched with client name by joining 
the stream (EtlTransactionRawStream) with client (etlbankclients) table on client.id
*/
select  txn.txn_id , txn.client_id, txn.product_category, txn.product_company, txn.subtype, convert(txn.amount, 'double') as amount, txn.date, txn.transaction_type, client.fullname as client_name
from EtlTransactionRawStream as txn join etlbankclients as client on txn.client_id == client.id 
insert into EtlBankTransactionEnricherClientNameStream;

/**
Enriches each transaction message in the stream and writes to a temporary stream - EtlBankTransactionEnricherClientNameStream
Each transaction message is enriched with category name by joining 
the stream (EtlBankTransactionEnricherClientNameStream) with categories (etlbankcategories) table on category.id
*/
select  clientS1.txn_id , clientS1.client_id, clientS1.product_category, clientS1.product_company, clientS1.subtype, clientS1.amount, clientS1.date, clientS1.transaction_type, clientS1.client_name, category.name as product_category_name 
from EtlBankTransactionEnricherClientNameStream as clientS1 join etlbankcategories as category on clientS1.product_category == category.id 
insert into EtlBankTransactionEnricherProductCategoryStream;


/**
Writes each of the enriched bank_transaction productCategoryStream messages to etlbanktransactions. 
*/
select   txn_id , client_id, product_category, product_company, subtype, amount, date, transaction_type, client_name, product_category_name
from EtlBankTransactionEnricherProductCategoryStream
insert into etlbanktransactions;


/**
Writes each of the enriched bank_transaction productCategoryStream messages as anonymous to etlbanktransactionsanonymization.  
*/
-- select   txn_id , client_id, product_category, product_company, subtype, amount, date, transaction_type, pii:fake(client_name, "NAME_FULLNAME") as client_name, product_category_name
select   txn_id , client_id, product_category, product_company, subtype, amount, date, transaction_type, pii:fake(client_id, "NAME_FULLNAME") as client_name, product_category_name
from EtlBankTransactionEnricherProductCategoryStream
insert into etlbanktransactionsanonymization;


/**
Writes each of the enriched bank_transaction productCategoryStream messages to EtlTransactionStream.  
*/
select   txn_id , client_id, product_category, product_company, subtype, amount, date, transaction_type, client_name, product_category_name
from EtlBankTransactionEnricherProductCategoryStream
insert into EtlTransactionStream;
  
```
