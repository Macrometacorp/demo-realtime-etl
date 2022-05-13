```js
@App:name("etl-bank-subscriptions")
@App:description("etl-bank-subscriptions")

/*
This stream worker
  * Enriches the data published in EtlSubscriptionRawStream with purchaser and product category names
  * Inserts enrinched data in etlbanksubscriptions table.
*/


-- Source definition. Stream worker reads subscriptions from this EtlSubscriptionRawStream global stream
@source(type = 'c8streams', collection = "etl_bank_transactions", stream.list="EtlSubscriptionRawStream" , replication.type="global", @map(type='json'))
define stream EtlSubscriptionRawStream (id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string);

-- Table definition. Stream worker writes enriched subscriptions to this table - etl_bank_subscriptions
@store(type='c8db', collection='etl_bank_subscriptions', replication.type="global")
define table etlbanksubscriptions(id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string, client_name string, product_category_name string);

-- Table definition. Stream worker reads purchasers (clients) information from this table - etl_bank_clients
@store(type='c8db', collection='etl_bank_clients', replication.type="global")
define table etlbankclients(id string, fullname string, address string, phone_number string, email string, workplace string, birthdate string, registration_date string, gender string, income string, expenses string, credit string, deposit string);

-- Table definition. Stream worker reads categoriesinformation from this table - etl_bank_categories
@store(type='c8db', collection='etl_bank_categories', replication.type="global")
define table etlbankcategories(id string, name string, description string);

-- Sink definition for EtlBankSubscriptionEnricherClientNameStream  worker.
@sink(type = 'c8streams', stream = "EtlBankSubscriptionEnricherClientNameStream")
define stream EtlBankSubscriptionEnricherClientNameStream (id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string, client_name string);

-- Sink definition for EtlBankSubscriptionEnricherProductCategoryStream  worker.
@sink(type = 'c8streams', stream = "EtlBankSubscriptionEnricherProductCategoryStream")
define stream EtlBankSubscriptionEnricherProductCategoryStream (id string, client_id string, product_category string, product_company string, amount string, date_start string, date_end string, client_name string, product_category_name string);

/**
Enriches each subscription message in the stream and writes to a temporary stream - EtlBankSubscriptionEnricherClientNameStream
Each subscription message is enriched with client fullname by joining 
the stream (EtlSubscriptionRawStream) with clients (etlbankclients) table on client-id
*/
select  subs.id , subs.client_id, 
        subs.product_category, subs.product_company, 
        subs.amount, subs.date_start, subs.date_end, 
        client.fullname as client_name
from EtlSubscriptionRawStream as subs join etlbankclients as client on subs.client_id == client.id 
insert into EtlBankSubscriptionEnricherClientNameStream;


/**
Enriches each subscription message in the stream and writes to a temporary stream - EtlBankSubscriptionEnricherClientNameStream
Each subscription message is enriched with category name by joining 
the stream (EtlSubscriptionRawStream) with categories (etlbankcategories) table on category.id
*/
select  clientS1.id , clientS1.client_id, 
        clientS1.product_category, clientS1.product_company, 
        clientS1.amount, clientS1.date_start, 
        clientS1.date_end, clientS1.client_name, 
        category.name as product_category_name
from EtlBankSubscriptionEnricherClientNameStream as clientS1 join etlbankcategories as category on clientS1.product_category == category.id 
insert into EtlBankSubscriptionEnricherProductCategoryStream;

/**
Writes each of the enriched subscription messages to etlbanksubscriptions table 
*/
select id , client_id , 
    product_category, product_company, 
    amount, date_start, date_end, 
    client_name, product_category_name
from EtlBankSubscriptionEnricherProductCategoryStream 
insert into etlbanksubscriptions;
  
```
