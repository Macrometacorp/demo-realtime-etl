```js
@App:name("etl-bank-txn-publisher")
@App:description("etl-bank-txn-publisher")

/*
This app reads 25 records every 5 seconds  from etl_bank_transactions_raw collection.
Then it publish the data in EtlTransactionRawStream stream which will be used as pipeline in the next stream app.
The data from the etl_bank_transactions_raw is fetched using restql etl_bank_transactions_raw_query and published in restqlStreamResponse stream.
*/

/**
Testing the Stream Application:
    1. Make sure to create the etl_bank_transactions_raw_query restql
	2. Publish the app       
    
*/

-- The trigger to read 25 records every 5 seconds.
define trigger etlBankTransactionTrigger at every 5 seconds;

-- Sink definition for intermediate restqlStream worker.
@sink(type='restql-call',restql.name="etl_bank_transactions_raw_query",sink.id="etl_bank")
define stream restqlStream(offsetValue long);

-- Source definition. Stream worker reads transactions from this intermediate restqlStreamResponse stream
@source(type='restql-call-response',sink.id="etl_bank", @map(type="json"))
define stream restqlStreamResponse(txn_id string, client_id string, product_category string, product_company string, subtype string, amount string, date string, transaction_type string);

-- Sink definition for EtlTransactionRawStream worker.
@sink(type = 'c8streams', stream = "EtlTransactionRawStream", replication.type="global")
define stream EtlTransactionRawStream (txn_id string, client_id string, product_category string, product_company string, subtype string, amount string, date string, transaction_type string);


/**
Writes each of the  bank_transaction  messages to intermediate  restqlStream.  
*/
select  (count() * 100) - 100  as offsetValue
  from etlBankTransactionTrigger
insert into restqlStream;

/**
Writes each of the enriched bank_transaction  messages to EtlTransactionRawStream. 
*/
select txn_id , client_id , product_category , product_company , subtype , amount , date , transaction_type 
  from restqlStreamResponse
insert into EtlTransactionRawStream;

```
