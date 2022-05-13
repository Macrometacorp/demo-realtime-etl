```js
@App:name("etl-bank-subscriptions-publisher")
@App:description("etl-bank-subscriptions-publisher")

/*
This app reads 25 records every 5 seconds  from etl_bank_subscriptions_raw collection.
Then it publish the data in EtlSubscriptionRawStream stream which will be used as pipeline in the next stream app.
The data from the etl_bank_subscriptions_raw is fetched using restql etl_bank_subscriptions_raw_query and published in restqlStreamResponse stream.
*/

/**
Testing the Stream Application:
    1. Make sure to create the etl_bank_subscriptions_raw_query restql
	2. Publish the app       
    
*/

-- The trigger to read 25 records every 5 seconds.
define trigger etlBankSubscriptionTrigger at every 5 seconds;

-- Sink definition for intermediate restqlStream worker.
@sink(type='restql-call',restql.name="etl_bank_subscriptions_raw_query",sink.id="etl_bank_subscription")
define stream restqlStream(offsetValue long);

-- Source definition. Stream worker reads subscriptions from this intermediate restqlStreamResponse stream
@source(type='restql-call-response',sink.id="etl_bank_subscription", @map(type="json"))
define stream restqlStreamResponse(id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string);

-- Sink definition for EtlSubscriptionRawStream worker.
@sink(type = 'c8streams', stream = "EtlSubscriptionRawStream", replication.type="global")
define stream EtlSubscriptionRawStream (id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string);

/**
Writes each of the  bank_subscription  messages to intermediate  restqlStream.  
*/
--select  eventTimestamp() as value, (count() * 100) - 100  as offsetValue
select  (count() * 100) - 100  as offsetValue
from etlBankSubscriptionTrigger
insert into restqlStream;

/**
Writes each of the enriched bank_subscription  messages to EtlSubscriptionRawStream. 
*/
select  id, client_id, product_category, product_company, amount, date_start, date_end
from restqlStreamResponse
insert into EtlSubscriptionRawStream;

```
